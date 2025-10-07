# 📦 Ecommerce App (Frontend)

Aplicación móvil desarrollada con **Ionic + React + TypeScript**, enfocada en facilitar la compra y personalización de productos mediante integración con **WooCommerce**.  
Los usuarios pueden explorar productos, realizar pedidos, comunicarse con el vendedor y gestionar su cuenta de forma segura.

---

### 🔐 Login Admin
<p align="center">
  <img src="https://github.com/user-attachments/assets/6594e209-9e24-4489-9325-95d3f2a462b7" width="30%" style="margin:10px;" />
</p>

---

### 👥 Activación/Desactivación de usuarios + Gráficos de ventas
<p align="center">
  <img src="https://github.com/user-attachments/assets/4c5330b6-3321-4381-b27f-32ea51a7a289" width="30%" style="margin:10px;" />
</p>

---

### 📦 Manejo de órdenes + Reportes y PDF
<p align="center">
  <img src="https://github.com/user-attachments/assets/ca27d708-2600-441b-9fe9-372bcf7c46a5" width="30%" style="margin:10px;" />
</p>

---

### 🛒 Carrito + Orden
<p align="center">
  <img src="https://github.com/user-attachments/assets/a5c0d92b-f3ba-493a-aa97-ad96cc4a5553" width="45%" style="margin:10px;" />
  <img src="https://github.com/user-attachments/assets/21031ff1-72b5-4e94-96e9-f0da93e0ea9c" width="45%" style="margin:10px;" />
</p>

---

### 👤 Perfil
<p align="center">
  <img src="https://github.com/user-attachments/assets/21031ff1-72b5-4e94-96e9-f0da93e0ea9c" width="30%" style="margin:10px;" />
</p>

---

### 💬 Soporte
<p align="center">
  <img src="https://github.com/user-attachments/assets/7e7acdf4-a874-42da-aaf9-e19b6d784a5a" width="45%" style="margin:10px;" />
  <img src="https://github.com/user-attachments/assets/ed8969a4-fcae-4a2c-9b8e-ce974005ccbd" width="45%" style="margin:10px;" />
</p>

---

### ⚙️ Vista Soporte Admin + Configuración + Estado Servidor
<p align="center">
  <img src="https://github.com/user-attachments/assets/ed8969a4-fcae-4a2c-9b8e-ce974005ccbd" width="30%" style="margin:10px;" />
</p>


## Tecnologías principales

- ⚛️ **React** + **Ionic Framework**
- 🔥 **Firebase Authentication** y **Firestore**
- 🌐 **Woocomerce API** (integración externa)
- 💬 **Chat en tiempo real**
- 💳 Flujo de compra con integración a **Flow.cl**

---

## 📁 Estructura del proyecto (frontend)

```bash
Ecommerce/
└── 📁public
└── 📁src
    └── 📁components
        └── 📁Footer
        └── 📁Header
        └── 📁homecomponents
            └── 📁CategoryList
            └── 📁DailyOffers
            └── 📁HowItWorks
            └── 📁ProductList
            └── 📁Slider
        └── 📁searchbarcomponents
    └── 📁context
    └── 📁hooks
    └── 📁pages
        └── 📁admin
        └── 📁auth
            └── 📁ForgotPassword
            └── 📁Login
            └── 📁Register
        └── 📁chat
        └── 📁checkout
        └── 📁home
        └── 📁product
        └── 📁SplashScreen
    └── 📁services
        ├── auth.service.ts
        ├── firebase.ts
        ├── mercadolibre.service.ts
        ├── payment.service.ts
        ├── producto.service.ts
    └── 📁theme
    └── 📁types
    └── 📁utils
    ├── App.css
    ├── App.test.tsx
    ├── App.tsx
    ├── main.tsx
    ├── setupTests.ts
    └── vite-env.d.ts
```

---

## 🧩 Instalación y ejecución

1. Clona este repositorio

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta en desarrollo (modo navegador):

```bash
ionic serve
```

o

```bash
npm run dev
```

> Puedes ejecutar en emulador/dispositivo físico usando:
>
> ```bash
> ionic cap run android
> ```

---

## 🔐 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto y agrega tu configuración de Firebase:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

---

## 🔒 Licencia

Este proyecto se encuentra bajo la licencia [MIT](LICENSE).

---
