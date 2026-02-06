# Pasos detallados para iniciar el proyecto Open9

Sigue estos pasos en orden. Necesitas **Node.js**, **Go** y **MySQL o MariaDB** instalados.

---

## 1. Comprobar requisitos

### Node.js (frontend)
```bash
node -v
npm -v
```
- Debe ser **v18 o superior**. Si no lo tienes: [nodejs.org](https://nodejs.org).

### Go (backend)
```bash
go version
```
- Debe ser **1.21 o superior**. Si no lo tienes: [go.dev/dl](https://go.dev/dl).

### MySQL o MariaDB
- **MySQL 5.7+** o **MariaDB 10.2+** (con soporte para tipo `JSON`).
- El servicio debe estar **en ejecución** (puerto 3306 por defecto en ambos).

Para comprobar la versión (MySQL y MariaDB usan el mismo cliente):
```bash
mysql --version
```
Si usas **MariaDB**, los mismos pasos y el mismo formato de `DATABASE_URL` sirven sin cambios.

---

## 2. Crear la base de datos (MySQL o MariaDB)

1. Abre un cliente (línea de comandos `mysql`, MySQL Workbench, HeidiSQL, DBeaver, etc.).

2. Conéctate con un usuario que tenga permisos para crear bases de datos (por ejemplo `root`).

3. Ejecuta:
```sql
CREATE DATABASE open9 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

4. (Opcional) Si quieres un usuario dedicado:
```sql
CREATE USER 'open9'@'localhost' IDENTIFIED BY 'tu_contraseña';
GRANT ALL PRIVILEGES ON open9.* TO 'open9'@'localhost';
FLUSH PRIVILEGES;
```
En ese caso usarás en el backend: `open9:tu_contraseña@tcp(localhost:3306)/open9?parseTime=true`.

---

## 3. Configurar y arrancar el backend (Go)

1. **Abrir terminal** y situarte en la carpeta del proyecto:
   ```bash
   cd e:\open9_web
   ```

2. **Entrar en la carpeta backend:**
   ```bash
   cd backend
   ```

3. **Crear el archivo de entorno** a partir del ejemplo:
   - **Windows (PowerShell):**
     ```powershell
     Copy-Item .env.example .env
     ```
   - **Windows (CMD) / Linux / macOS:**
     ```bash
     cp .env.example .env
     ```

4. **Editar `.env`** con tu conexión y JWT:
   - Abre `backend\.env` en el editor.
   - Ajusta al menos:
     - **DATABASE_URL:** usuario y contraseña de MySQL/MariaDB, host, puerto y nombre de base.
       - Ejemplo si usas `root` sin contraseña en local:
         ```
         DATABASE_URL=root:@tcp(localhost:3306)/open9?parseTime=true
         ```
       - Ejemplo con contraseña:
         ```
         DATABASE_URL=root:miPassword@tcp(localhost:3306)/open9?parseTime=true
         ```
     - **JWT_SECRET:** una cadena larga y aleatoria (en producción, que sea segura).
       - Ejemplo: `JWT_SECRET=mi-clave-secreta-jwt-2024`
   - Opcionales: `ADMIN_DEFAULT_PASSWORD` (contraseña del admin al crearse), `PORT` (por defecto 8080).

5. **Descargar dependencias de Go y arrancar el servidor:**
   ```bash
   go mod tidy
   go run ./cmd/server
   ```

6. **Comprobar que el backend responde:**
   - Deberías ver en consola algo como: `Server running on :8080`
   - En el primer arranque se crean las tablas y el usuario admin (usuario: `admin`, contraseña: la de `ADMIN_DEFAULT_PASSWORD` o `admin123` por defecto).
   - Deja esta terminal abierta mientras trabajas con el frontend.

---

## 4. Configurar y arrancar el frontend (React + Vite)

1. **Abrir otra terminal** (la del backend puede seguir ejecutándose).

2. **Ir a la raíz del proyecto:**
   ```bash
   cd e:\open9_web
   ```

3. **Instalar dependencias de Node:**
   ```bash
   npm install
   ```

4. **(Opcional)** Si el backend no está en `http://localhost:8080`, crea un archivo `.env` en la raíz del proyecto (junto a `package.json`) con:
   ```
   VITE_API_URL=http://localhost:8080
   ```
   Cambia la URL si tu backend usa otro host o puerto.

5. **Arrancar el frontend en modo desarrollo:**
   ```bash
   npm run dev
   ```

6. **Abrir la aplicación:**
   - Vite suele indicar la URL, por ejemplo: `http://localhost:3000`
   - Ábrela en el navegador.

---

## 5. Probar que todo funciona

1. **Página pública:** deberías ver la landing (inicio, servicios, portafolio, etc.). Los proyectos y logos se cargan desde el backend (al principio pueden estar vacíos).

2. **Login admin:**
   - En la web, clic en **Admin** (o "Staff Access" en el pie).
   - Usuario: **admin**
   - Contraseña: la que pusiste en `ADMIN_DEFAULT_PASSWORD` o **admin123** por defecto.
   - Tras iniciar sesión deberías ver el panel (solicitudes, clientes, portafolio, mensajes).

3. **Formularios:** prueba "Iniciar Proyecto" y el formulario de contacto; los datos deben guardarse en MySQL y verse en el panel admin.

---

## Resumen rápido (cuando ya tienes MySQL y la BD creada)

```bash
# Terminal 1 - Backend
cd e:\open9_web\backend
copy .env.example .env
# Editar .env (DATABASE_URL y JWT_SECRET)
go mod tidy
go run ./cmd/server

# Terminal 2 - Frontend
cd e:\open9_web
npm install
npm run dev
```

Luego abre **http://localhost:3000** y entra al admin con **admin** / **admin123** (o la contraseña que hayas configurado).

---

## Solución de problemas

### Error: `unknown auth plugin: auth_gssapi_client` / `this authentication plugin is not supported`

Este error es **típico de MySQL** (no de MariaDB). El usuario está usando autenticación GSSAPI/Kerberos, que el driver de Go no soporta. Si usas **MariaDB**, normalmente no verás este problema.

Si usas MySQL, cambia ese usuario a un plugin soportado:

1. Conéctate a MySQL con un cliente que sí use ese plugin (o con otro usuario que tenga permisos), por ejemplo:
   ```bash
   mysql -u root -p
   ```

2. Comprueba el usuario que usas en `DATABASE_URL` (ej. `root`):
   ```sql
   SELECT user, host, plugin FROM mysql.user WHERE user = 'root';
   ```

3. Cambia el plugin a `mysql_native_password` (compatible con el driver):
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tu_contraseña_actual';
   FLUSH PRIVILEGES;
   ```
   Sustituye `root` por tu usuario si es otro, y `tu_contraseña_actual` por la contraseña que quieras usar (la misma que en `.env`).

4. Si prefieres usar el plugin moderno `caching_sha2_password` (MySQL 8+), el driver de Go también lo soporta:
   ```sql
   ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'tu_contraseña_actual';
   FLUSH PRIVILEGES;
   ```

5. Vuelve a arrancar el backend: `go run ./cmd/server`.
