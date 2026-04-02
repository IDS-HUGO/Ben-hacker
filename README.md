# Cuentas Ben-Hacker

Sistema monolítico para venta de cuentas de streaming con panel administrativo, control de clientes y garantía de servicio.

## 🎨 Características

### Landing Page Pública
- Visualización de productos/cuentas disponibles
- Botón de contacto por WhatsApp
- Información de garantía y servicio
- Diseño Material You con paleta azul rey, rojo y azul marino

### Panel Administrador (con login)
- Registro y gestión de productos/cuentas
- CRUD completo de productos
- Registro de clientes con datos (nombre, teléfono, estado de pagos)
- Visualización de clientes en tabla
- Subida de imágenes a Cloudinary
- Autenticación de usuario

## 🚀 Stack Tecnológico

- **Frontend:** Next.js 14, React, TypeScript, Material-UI (MUI)
- **Backend:** Express, TypeScript
- **Base de Datos:** SQLite con Prisma ORM
- **Storage de Imágenes:** Cloudinary
- **Deployment:** Vercel (frontend) + Node.js (backend)

## 📋 Requisitos Previos

- Node.js 18+
- npm o yarn

## 🔧 Instalación y Configuración

### Frontend

```bash
cd front
npm install
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

### Backend

```bash
cd back
npm install
npm run build
npm run dev
```

El backend estará disponible en `http://localhost:3001`

### Base de Datos

Para inicializar la base de datos:

```bash
cd back
npx prisma migrate dev --name init
npx prisma db seed
```

## 👤 Credenciales de Prueba

**Usuario Admin:**
- Usuario: `admin`
- Contraseña: `admin123`

## 📦 Despliegue

### Frontend en Vercel
1. Conecta tu repositorio GitHub a Vercel
2. Deploy automático al hacer push

### Backend
El backend necesita un servidor Node.js con soporte para:
```bash
npm run build
npm start
```

## 🌐 API Endpoints

- `GET /api/productos` - Listar productos
- `POST /api/productos` - Crear producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto
- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Agregar cliente
- `POST /api/auth/login` - Login admin

## 📄 Licencia

Proyecto privado para Cuentas Ben-Hacker 2026
