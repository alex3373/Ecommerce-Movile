# 📦 Dropshipping App (Frontend)

Aplicación móvil desarrollada con **Ionic + React + TypeScript**, enfocada en facilitar la compra y personalización de productos mediante integración con WooCommerc. Los usuarios pueden explorar productos, realizar pedidos, comunicarse con el vendedor y gestionar su cuenta de forma segura.

---

## Tecnologías principales

- ⚛️ **React** + **Ionic Framework**
- 🔥 **Firebase Authentication** y **Firestore**
- 🌐 **Woocomerce API** (integración externa)
- 💬 **Chat en tiempo real**
- 💳 Flujo de compra con integración a **Flow.cl**

---

## 📁 Estructura del proyecto (frontend)

```bash
dropshipping/
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

1. Clona este repositorio:

```bash
git clone https://github.com/Yampi0/dropshipping.git
cd dropshipping
```

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
