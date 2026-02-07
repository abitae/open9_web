<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClientLogo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClientLogoController extends Controller
{
    public function index(): JsonResponse
    {
        $logos = ClientLogo::orderBy('id')->get();

        return response()->json($logos->map(fn (ClientLogo $l) => [
            'id' => $l->id,
            'name' => $l->name,
            'url' => $l->url,
        ])->all());
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'url' => ['required', 'string'],
        ]);

        $logo = ClientLogo::create($validated);

        return response()->json([
            'id' => $logo->id,
            'name' => $logo->name,
            'url' => $logo->url,
        ], 201);
    }

    public function destroy(int $id): JsonResponse
    {
        $logo = ClientLogo::find($id);
        if (! $logo) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $logo->delete();

        return response()->json(null, 204);
    }
}
