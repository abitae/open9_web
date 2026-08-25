<?php

namespace App\Http\Controllers\Api\Auth;

use App\Enums\RecordStatus;
use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\SocialLoginSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\AbstractProvider;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirectResponse;

class GoogleAuthController extends Controller
{
    /**
     * Redirige a Google si el módulo está habilitado y configurado.
     * Acepta ?return_to= para devolver al frontend correcto tras el login
     * (p. ej. localhost:3002 en dev aunque FRONTEND_URL apunte a otro puerto).
     */
    public function redirect(Request $request): SymfonyRedirectResponse|RedirectResponse
    {
        $returnTo = $this->resolveReturnTo($request->query('return_to'));

        $settings = SocialLoginSetting::current();

        if (! $settings->googleEnabled()) {
            return redirect($this->frontendUrl('/ingresar?error=google_disabled', $returnTo));
        }

        $this->configureDriver($settings);

        $state = Str::random(40);
        Cache::put($this->oauthCacheKey($state), $returnTo, now()->addMinutes(10));

        return $this->googleDriver()->with(['state' => $state])->redirect();
    }

    /**
     * Recibe el callback de Google, crea/busca el Client y emite un token.
     */
    public function callback(Request $request): RedirectResponse
    {
        $returnTo = $this->pullReturnTo((string) $request->query('state', ''));

        $settings = SocialLoginSetting::current();

        if (! $settings->googleEnabled()) {
            return redirect($this->frontendUrl('/ingresar?error=google_disabled', $returnTo));
        }

        $this->configureDriver($settings);

        try {
            $googleUser = $this->googleDriver()->user();
        } catch (\Throwable $exception) {
            Log::warning('Fallo en el callback de Google.', ['error' => $exception->getMessage()]);

            return redirect($this->frontendUrl('/ingresar?error=google_failed', $returnTo));
        }

        $email = $googleUser->getEmail();

        if ($email === null || $email === '') {
            return redirect($this->frontendUrl('/ingresar?error=google_no_email', $returnTo));
        }

        $client = Client::query()->where('google_id', $googleUser->getId())->first()
            ?? Client::query()->where('email', $email)->first();

        if ($client === null) {
            $client = new Client;
            $client->email = $email;
            $client->password = null;
            $client->status = RecordStatus::Active;
        }

        $client->name = $client->name ?: ($googleUser->getName() ?: Str::before($email, '@'));
        $client->google_id = $googleUser->getId();
        $client->avatar = $client->avatar ?: $googleUser->getAvatar();

        if ($client->email_verified_at === null) {
            $client->email_verified_at = now();
        }

        $client->last_login_at = now();
        $client->save();

        $token = $client->createToken('google')->plainTextToken;

        return redirect($this->frontendUrl('/auth/callback?token='.urlencode($token), $returnTo));
    }

    /**
     * Devuelve el driver de Google como proveedor OAuth2 en modo stateless
     * (la API no usa sesión, así que evitamos la verificación de estado).
     */
    private function googleDriver(): AbstractProvider
    {
        $driver = Socialite::driver('google');

        abort_unless($driver instanceof AbstractProvider, 500, 'El proveedor de Google no está disponible.');

        return $driver->stateless();
    }

    private function configureDriver(SocialLoginSetting $settings): void
    {
        config([
            'services.google.client_id' => $settings->google_client_id,
            'services.google.client_secret' => $settings->resolvedGoogleClientSecret(),
            'services.google.redirect' => $settings->google_redirect_url ?: url('/api/auth/google/callback'),
        ]);
    }

    private function pullReturnTo(string $state): string
    {
        if ($state === '') {
            return $this->defaultFrontendBase();
        }

        $cached = Cache::pull($this->oauthCacheKey($state));

        return is_string($cached) && $cached !== ''
            ? $cached
            : $this->defaultFrontendBase();
    }

    private function resolveReturnTo(mixed $returnTo): string
    {
        $default = $this->defaultFrontendBase();

        if (! is_string($returnTo) || $returnTo === '') {
            return $default;
        }

        $returnTo = rtrim($returnTo, '/');
        $parts = parse_url($returnTo);

        if (! is_array($parts) || empty($parts['scheme']) || empty($parts['host'])) {
            return $default;
        }

        if (app()->environment('local')) {
            if (in_array($parts['host'], ['localhost', '127.0.0.1', '[::1]'], true)) {
                return $returnTo;
            }
        }

        $allowed = rtrim((string) config('app.frontend_url'), '/');

        if ($allowed !== '' && ($returnTo === $allowed || str_starts_with($returnTo, $allowed.'/'))) {
            return $returnTo;
        }

        return $default;
    }

    private function defaultFrontendBase(): string
    {
        return rtrim((string) (config('app.frontend_url') ?: config('app.url')), '/');
    }

    private function frontendUrl(string $path, ?string $base = null): string
    {
        return rtrim($base ?? $this->defaultFrontendBase(), '/').'/'.ltrim($path, '/');
    }

    private function oauthCacheKey(string $state): string
    {
        return 'google_oauth_return:'.hash('sha256', $state);
    }
}
