# Desplegar Open9 en hosting compartido

En un **hosting compartido** normalmente solo puedes subir archivos estáticos (HTML, CSS, JS) y a veces PHP. **No se puede ejecutar el backend en Go** ni instalar servicios propios. Por eso el despliegue se hace así:

- **En el hosting compartido:** solo el **frontend** (la web estática que genera Vite).
- **En otro sitio:** el **backend (Go) y la base de datos (MySQL/MariaDB)** deben estar ya desplegados (por ejemplo en una EC2, Railway, Render, etc.).

Si aún no tienes el backend en ningún sitio, sigue primero [DEPLOY_EC2.md](DEPLOY_EC2.md) para poner API + base de datos en una instancia, o usa un servicio como [Railway](https://railway.app) / [Render](https://render.com) para el backend.

---

## 1. Tener el backend y la API disponibles

Necesitas una URL pública donde ya esté funcionando tu API, por ejemplo:

- `https://api.tudominio.com`
- `http://IP_DE_TU_EC2` (si en EC2 usas Nginx con proxy a `/api`)
- `https://tu-app.railway.app` (si usas Railway)

Anota esa URL; la usarás como `VITE_API_URL` al construir el frontend.

---

## 2. Construir el frontend en tu PC

El proyecto está configurado para hosting compartido: rutas de recursos relativas (`base: './'`) y build optimizada.

En la raíz del proyecto (donde está `package.json`):

1. Crea un `.env` con la URL de tu API (sin barra final). Puedes copiar `.env.example` y editarlo:

```bash
# Copia el ejemplo y edita VITE_API_URL
copy .env.example .env
# Edita .env y pon la URL de tu backend, ej.:
# VITE_API_URL=https://api.tudominio.com
```

2. Instala dependencias y genera la build:

```bash
npm install
npm run build
```

O, para build pensada para subir al hosting:

```bash
npm run build:hosting
```

Se crea la carpeta **`dist/`** con todo el sitio estático (HTML, JS, CSS, imágenes). Los archivos usan rutas relativas (`./assets/...`) para que funcionen en cualquier carpeta del servidor.

---

## 3. Subir los archivos al hosting compartido

### Opción A — FTP / SFTP (FileZilla, WinSCP, etc.)

1. Conéctate con los datos que te dio tu proveedor (host, usuario, contraseña, puerto 21 FTP o 22 SFTP).
2. Entra en la carpeta pública del sitio. Suele llamarse:
   - **`public_html`**
   - **`www`**
   - **`htdocs`**
   - o la que indique el panel (cPanel, Plesk, etc.).
3. **Sube el contenido de `dist/`**, no la carpeta `dist` en sí:
   - Es decir: dentro de `public_html` (o la que sea) deben quedar directamente `index.html`, la carpeta `assets/`, etc.

Estructura correcta en el servidor:

```text
public_html/
  index.html
  assets/
    index-xxxxx.js
    index-xxxxx.css
  (y el resto de archivos que haya en dist/)
```

No dejes una carpeta `dist` dentro de `public_html`; el contenido de `dist` va en la raíz de la web.

### Opción B — Administrador de archivos del panel (cPanel, etc.)

1. Entra al **Administrador de archivos** o **File Manager**.
2. Navega a `public_html` (o la carpeta raíz del dominio).
3. Borra el contenido antiguo si lo hay (cuidado si tienes otros proyectos en la misma raíz).
4. Usa **“Subir” / “Upload”** y sube **todos** los archivos y carpetas que hay dentro de `dist/` (incluido `index.html` y `assets/`).

---

## 4. Configurar el sitio para una SPA (React)

En React/Vite, las rutas se resuelven en el cliente. Si el servidor no está configurado para eso, al recargar en una ruta como `tudominio.com/contacto` dará 404. Hay que indicar que todas las peticiones que no sean a un archivo existente se redirijan a `index.html`.

### Si tu hosting usa Apache (.htaccess)

Crea o edita el archivo **`.htaccess`** en la misma carpeta donde está `index.html` (por ejemplo dentro de `public_html`):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Guárdalo y sube el `.htaccess` al mismo sitio que `index.html`.

### Si usas Nginx (algunos hostings lo permiten)

En la configuración del sitio, algo equivalente a:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

El proveedor suele tener una opción tipo “Editor de Nginx” o documentación para “Single Page Application”.

### Si no puedes tocar Apache/Nginx

Algunos paneles tienen una opción tipo **“Directorio por defecto”** o **“Error document 404”** apuntando a `index.html`. Revisa la ayuda de tu hosting.

---

## 5. Comprobar que todo funciona

1. Abre tu dominio en el navegador: `https://tudominio.com` (o la URL que uses).
2. Debe cargar la landing de Open9.
3. Navega a otra sección (Contacto, Portafolio, etc.) y recarga la página: no debe salir 404.
4. Prueba **Admin** y el formulario de contacto; las peticiones deben ir a la URL que pusiste en `VITE_API_URL` (tu backend).

Si la web carga pero “Admin” o los formularios fallan, revisa que:

- `VITE_API_URL` en el momento del build sea exactamente la URL base del API (sin `/api` al final).
- El backend permita peticiones desde tu dominio (CORS). En tu backend Go ya está `*` en desarrollo; en producción puedes restringir a `https://tudominio.com`.

---

## 6. Resumen rápido

| Paso | Qué hacer |
|------|-----------|
| 1 | Tener el backend y la base de datos desplegados en otro sitio (EC2, Railway, etc.). |
| 2 | En tu PC: `VITE_API_URL=https://url-de-tu-api` en `.env`, luego `npm run build`. |
| 3 | Subir **el contenido de `dist/`** (no la carpeta `dist`) a `public_html` (o la raíz web) por FTP o panel. |
| 4 | Crear/editar `.htaccess` (o config Nginx) para que todas las rutas devuelvan `index.html`. |
| 5 | Probar el dominio, las rutas y el login/API. |

---

## 7. Actualizar el sitio más adelante

1. En tu PC: cambia código, luego `npm run build` otra vez.
2. Vuelve a subir **todo el contenido de `dist/`** (puedes sobrescribir los archivos antiguos).
3. Si cambias la URL del API, pon la nueva en `VITE_API_URL`, haz de nuevo `npm run build` y vuelve a subir.

---

## 8. Hosting solo con frontend (sin backend en el mismo plan)

En la mayoría de hostings compartidos **no** podrás:

- Ejecutar el binario de Go (backend).
- Instalar o administrar MySQL para ese backend.
- Usar systemd, Docker ni puertos personalizados.

Por eso el esquema es:

- **Hosting compartido** → solo archivos estáticos (frontend).
- **Otro servicio** (EC2, VPS, Railway, Render, etc.) → backend + base de datos.

Si quieres todo en un solo servidor bajo tu control, usa un VPS o una EC2; en ese caso la guía que aplica es [DEPLOY_EC2.md](DEPLOY_EC2.md).
