# Desplegar Open9 en AWS EC2

Pasos para subir el proyecto (frontend React + backend Go + MySQL/MariaDB) a una instancia EC2 de AWS.

---

## 1. Crear y configurar la instancia EC2

1. En **AWS Console** → **EC2** → **Instancias** → **Lanzar instancia**.
2. **Nombre:** p. ej. `open9-prod`.
3. **AMI:** Amazon Linux 2023 o **Ubuntu Server 22.04 LTS** (recomendado).
4. **Tipo:** `t2.micro` (capa gratuita) o `t3.small` si necesitas más recursos.
5. **Par de claves:** Crear o seleccionar un par (.pem) y descargarlo.
6. **Grupo de seguridad:** Crear uno y abrir:
   - **SSH (22)** — tu IP (o 0.0.0.0/0 solo para pruebas).
   - **HTTP (80)** — 0.0.0.0/0
   - **HTTPS (443)** — 0.0.0.0/0 (para SSL más adelante).
   - **Custom TCP 8080** — 0.0.0.0/0 (solo si el frontend llama al API en `http://IP:8080`; si usas Nginx con `VITE_API_URL=http://IP` sin puerto, no hace falta).
7. **Almacenamiento:** 8–20 GB.
8. Lanzar y anotar la **IP pública** (o asignar Elastic IP).

---

## 2. Conectar por SSH

```bash
ssh -i "ruta/a/tu-clave.pem" ubuntu@TU_IP_PUBLICA
```

- **Ubuntu:** usuario `ubuntu`.
- **Amazon Linux:** usuario `ec2-user`.

Si fallan permisos de la clave: `chmod 400 tu-clave.pem`

---

## 3. Instalar dependencias en el servidor

### 3.1 Actualizar sistema (Ubuntu)

```bash
sudo apt update && sudo apt upgrade -y
```

### 3.2 Node.js (para construir el frontend)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v && npm -v
```

### 3.3 Go (backend)

```bash
wget https://go.dev/dl/go1.21.13.linux-amd64.tar.gz
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.21.13.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
go version
```

### 3.4 MariaDB o MySQL

```bash
sudo apt install -y mariadb-server
sudo systemctl start mariadb && sudo systemctl enable mariadb
sudo mysql_secure_installation
```

Crear base y usuario:

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE open9 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'open9'@'localhost' IDENTIFIED BY 'TU_PASSWORD_SEGURA';
GRANT ALL PRIVILEGES ON open9.* TO 'open9'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3.5 Nginx

```bash
sudo apt install -y nginx
```

---

## 4. Subir el proyecto

**Opción A — Git (recomendado)**

En el servidor:

```bash
cd ~
git clone https://github.com/TU_USUARIO/open9_web.git
cd open9_web
```

**Opción B — SCP desde tu PC**

En tu máquina:

```bash
scp -i "ruta/a/tu-clave.pem" -r e:\open9_web ubuntu@TU_IP_PUBLICA:~/open9_web
```

En el servidor: `cd ~/open9_web`

---

## 5. Configurar el backend

```bash
cd ~/open9_web/backend
nano .env
```

Contenido (ajusta contraseñas):

```env
DATABASE_URL=open9:TU_PASSWORD_SEGURA@tcp(127.0.0.1:3306)/open9?parseTime=true
JWT_SECRET=genera-una-clave-larga-y-aleatoria
ADMIN_DEFAULT_USER=abitae
ADMIN_DEFAULT_PASSWORD=lobomalo123
PORT=8080
```

Compilar y probar:

```bash
go mod tidy
go build -o open9-server ./cmd/server
./open9-server
```

Verás `Server running on :8080`. Detén con Ctrl+C.

---

## 6. Construir el frontend

**Importante:** Define la URL pública antes del build para que el frontend llame al API en tu servidor. Nginx hará proxy de `/api` al backend.

```bash
cd ~/open9_web
# Sustituye TU_IP_PUBLICA por la IP de tu EC2 o por tu dominio (sin barra final)
echo 'VITE_API_URL=http://TU_IP_PUBLICA' > .env
# Si usas dominio: echo 'VITE_API_URL=https://tudominio.com' > .env
npm install
npm run build
```

Se genera la carpeta `dist/`. Las peticiones irán a `http://TU_IP_PUBLICA/api/...` y Nginx las enviará al backend en el puerto 8080.

---

## 7. Configurar Nginx

```bash
sudo nano /etc/nginx/sites-available/open9
```

Contenido (sustituye `TU_IP_PUBLICA` o tu dominio; si no usas `ubuntu`, cambia `/home/ubuntu`):

```nginx
server {
    listen 80;
    server_name TU_IP_PUBLICA;

    root /home/ubuntu/open9_web/dist;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Activar y recargar:

```bash
sudo ln -sf /etc/nginx/sites-available/open9 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 8. Dejar el backend corriendo (systemd)

```bash
sudo nano /etc/systemd/system/open9-api.service
```

Contenido (ajusta `User` y rutas si no es `ubuntu`):

```ini
[Unit]
Description=Open9 API Backend
After=network.target mariadb.service

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/open9_web/backend
ExecStart=/home/ubuntu/open9_web/backend/open9-server
Restart=always
RestartSec=5
EnvironmentFile=/home/ubuntu/open9_web/backend/.env

[Install]
WantedBy=multi-user.target
```

Activar e iniciar:

```bash
sudo systemctl daemon-reload
sudo systemctl enable open9-api
sudo systemctl start open9-api
sudo systemctl status open9-api
```

---

## 9. Probar el despliegue

1. En el navegador: **http://TU_IP_PUBLICA** — debe cargar la landing.
2. **Admin** → usuario `abitae`, contraseña la de `ADMIN_DEFAULT_PASSWORD` (p. ej. `lobomalo123`).
3. Si algo falla:
   - Backend: `sudo journalctl -u open9-api -f`
   - Nginx: `sudo tail -f /var/log/nginx/error.log`

---

## 10. Resumen rápido

| Paso | Comando / acción |
|------|------------------|
| EC2 | Lanzar instancia Ubuntu, abrir 22, 80, 443 |
| SSH | `ssh -i clave.pem ubuntu@IP` |
| Deps | Node, Go, MariaDB, Nginx |
| Proyecto | `git clone` o `scp` |
| Backend | `.env` en `backend/`, `go build -o open9-server ./cmd/server` |
| Frontend | `VITE_API_URL=http://IP` en `.env`, `npm run build` |
| Nginx | Sitio con `root` a `dist/` y `proxy_pass /api/` a 8080 |
| Servicio | systemd `open9-api.service` para el binario |

---

## 11. Dominio y HTTPS (recomendado)

Sirves la app y el API por HTTPS desde el mismo dominio. Así evitas "Failed to fetch" por contenido mixto (página HTTPS llamando a API HTTP).

**Requisito:** Un dominio con registro **A** apuntando a la IP de la EC2 (Elastic IP recomendada). Let's Encrypt no emite certificados para IPs.

### 11.1 Certificado SSL con Let's Encrypt

En la EC2 (Ubuntu/Debian):

```bash
sudo apt update
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

Certbot modificará la configuración de Nginx para escuchar en 443 y redirigir HTTP → HTTPS. Responde al asistente (email, términos).

### 11.2 Nginx con HTTPS

Si prefieres configurar a mano, en `/etc/nginx/sites-available/open9`:

```nginx
server {
    listen 80;
    server_name tudominio.com www.tudominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name tudominio.com www.tudominio.com;

    ssl_certificate /etc/letsencrypt/live/tudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tudominio.com/privkey.pem;

    root /home/ubuntu/open9_web/dist;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

*(Ajusta `root` si usas `ec2-user`: `/home/ec2-user/open9_web/dist`. Las rutas de `ssl_certificate` las crea Certbot.)*

```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 11.3 Frontend con API por HTTPS

En tu máquina (o en la EC2 si construyes ahí):

```bash
cd open9_web
echo 'VITE_API_URL=https://tudominio.com' > .env
npm run build
```

Sube de nuevo la carpeta `dist/` a la EC2. Las peticiones irán a `https://tudominio.com/api/...` y Nginx las enviará al backend en 8080. **No hace falta abrir el puerto 8080** en el Security Group; solo 80 y 443.

### 11.4 Resumen HTTPS

| Paso | Acción |
|------|--------|
| DNS | A (y opcionalmente AAAA) de `tudominio.com` y `www` → IP de la EC2 |
| Certificado | `sudo certbot --nginx -d tudominio.com -d www.tudominio.com` |
| Nginx | Servir `dist/` y `location /api/` → `http://127.0.0.1:8080` |
| Build | `VITE_API_URL=https://tudominio.com` y `npm run build` |
| Security Group | Puertos 80 y 443 abiertos; 8080 puede quedarse cerrado al exterior |
