# OPEN9 — copia para BanaHosting

Raiz web del hosting (`/home/suohtvln/public_html`).

## Estructura

```
public_html/          document root
  index.php           entrypoint PHP
  .htaccess
  index.html          SPA React
  assets/
  build/
  open9/              Laravel (bloqueado por Apache)
    .env              produccion
    artisan
    vendor/
```

## Primer despliegue (SSH en el servidor)

```bash
cd ~/public_html/open9
nano .env                    # completar DB_PASSWORD
php artisan key:generate --force
php artisan migrate --seed --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Enlace para archivos subidos:

```bash
ln -sf /home/suohtvln/public_html/open9/storage/app/public /home/suohtvln/public_html/storage
```

Cron (opcional):

```bash
/opt/cpanel/ea-php83/root/usr/bin/php /home/suohtvln/public_html/open9/artisan schedule:run >> /dev/null 2>&1
```

## Variables `.env` (open9/.env)

```env
PUBLIC_PATH=/home/suohtvln/public_html
APP_URL=https://www.open9.dev
FRONTEND_URL=https://www.open9.dev
DB_DATABASE=suohtvln_open9
DB_USERNAME=suohtvln_open9
APP_ENV=production
APP_DEBUG=false
```

## MySQL (cPanel)

- Base: `suohtvln_open9`
- Usuario: `suohtvln_open9`
- Host: `localhost`

## Desarrollo en Windows

El codigo fuente se edita en `backend_open9/` (proyecto original).
Esta carpeta `public_html/` solo se sube al hosting; copia aqui los cambios
de `backend_open9/public/` y el resto del proyecto en `open9/` cuando actualices.
