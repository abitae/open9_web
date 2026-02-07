# Open9 Software Solutions

Landing y panel de administración para Open9, con backend en Go, persistencia en MySQL o MariaDB y autenticación JWT.

**Guía paso a paso:** [INICIO.md](INICIO.md) — pasos detallados para poner en marcha el proyecto.  
**Desplegar en AWS EC2:** [DEPLOY_EC2.md](DEPLOY_EC2.md) — subir el proyecto a una instancia EC2.  
**Hosting compartido:** [DEPLOY_HOSTING_COMPARTIDO.md](DEPLOY_HOSTING_COMPARTIDO.md) — subir solo el frontend y conectar a tu API.

## Requisitos

- **Frontend:** Node.js (v18+)
- **Backend:** Go 1.21+
- **Base de datos:** MySQL 5.7+ o MariaDB 10.2+ (con soporte JSON)

## Configuración

### 1. Base de datos (MySQL o MariaDB)

Crea la base de datos y un usuario si lo necesitas:

```sql
CREATE DATABASE open9 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

El backend aplica el esquema (tablas) en el primer arranque.

### 2. Backend (Go)

```bash
cd backend
cp .env.example .env
# Edita .env con tu DATABASE_URL y JWT_SECRET
go mod tidy
go run ./cmd/server
```

El servidor arranca en `http://localhost:8080` (o el `PORT` definido en `.env`).

Formato típico de `DATABASE_URL` (MySQL o MariaDB):

```
usuario:contraseña@tcp(localhost:3306)/open9?parseTime=true
```

En el primer arranque se ejecutan las migraciones y se crea el usuario admin por defecto si no existe:

- **Usuario:** `abitae` (o `ADMIN_DEFAULT_USER`)
- **Contraseña:** la definida en `ADMIN_DEFAULT_PASSWORD` (por defecto `lobomalo123`)

Cambia la contraseña en producción.

Variables de entorno (ver [backend/.env.example](backend/.env.example)):

- `DATABASE_URL` — DSN de conexión MySQL/MariaDB
- `JWT_SECRET` — Clave para firmar los JWT
- `ADMIN_DEFAULT_USER` — Usuario admin al hacer seed (opcional, por defecto `abitae`)
- `ADMIN_DEFAULT_PASSWORD` — Contraseña del admin al hacer seed (opcional, por defecto `lobomalo123`)
- `PORT` — Puerto del servidor (por defecto 8080)

### 3. Frontend (React + Vite)

```bash
npm install
# Opcional: crea .env con VITE_API_URL=http://localhost:8080 si el API está en otra URL
npm run dev
```

La app se sirve en `http://localhost:3000` y consume el API en `http://localhost:8080` por defecto.

## Estructura del proyecto

- **Frontend:** `App.tsx`, `api/client.ts`, `views/`, `components/`
- **Backend:** `backend/cmd/server/main.go`, `backend/internal/` (db, models, auth, handlers)

## API

- **Público:** `GET /api/projects`, `GET /api/client-logos`, `POST /api/inquiries`, `POST /api/contact`
- **Auth:** `POST /api/auth/login` (body: `{ "username", "password" }` → `{ "token" }`)
- **Admin (Header `Authorization: Bearer <token>`):** `GET /api/admin/inquiries`, `GET /api/admin/messages`, `POST/DELETE /api/admin/projects`, `POST/DELETE /api/admin/client-logos`
