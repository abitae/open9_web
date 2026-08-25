# OPEN9 — entorno local (Windows)

La raiz web es **`open9_web/`**, no `open9/public/`. Laravel vive en `open9_web/open9/`.

## Estructura

```
open9_web/              document root (carpeta padre de open9/)
  index.php             entrypoint PHP
  index.html            SPA React
  assets/               frontend compilado
  build/                assets Vite del admin
  storage/              enlace: php artisan storage:link
  open9/                Laravel (sin carpeta public/ activa)
    .env
    artisan
    vendor/
```

## Arrancar en local

```powershell
cd D:\Project\Open9\open9_web\open9

php artisan key:generate --force
php artisan config:clear
php artisan migrate --seed --force
php artisan storage:link
php artisan serve
```

Abre: http://127.0.0.1:8000

`php artisan serve` sirve desde `open9_web/` (carpeta padre de `open9/`; no hace falta configurarlo).

## Variables `.env` (local)

```env
APP_URL=http://127.0.0.1:8000
DB_USERNAME=root
DB_DATABASE=open9
```

MercadoPago, Google OAuth y AWS se configuran en el **panel admin**; no hace falta ponerlas en `.env` para desarrollo local.

## Frontend admin (Vite)

```powershell
cd open9
npm run build
```

Los assets del admin se generan en `open9_web/build/` (no en `open9/public/`).

## SPA React (sitio público)

Los estilos y componentes viven en el build de React (`assets/`).  
`index.html` solo es el entry point — **no editar CSS ahí**; los cambios van en React y se regeneran con el build.

Copia el build a `open9_web/assets/` + `open9_web/index.html` al desplegar.

## Proyecto fuente

Codigo Laravel: `backend_open9/`. Sincroniza cambios a `open9_web/open9/` cuando pruebes el layout de hosting.
