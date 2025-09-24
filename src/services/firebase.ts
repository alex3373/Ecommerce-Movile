// src/services/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Configuración del nuevo proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCuy5K4di7dO1Uf9U48c9LWpLkAbmXHzpY",
  authDomain: "app-sellsecommerce.firebaseapp.com",
  projectId: "app-sellsecommerce",
  storageBucket: "app-sellsecommerce.appspot.com", // ⚠️ revisa que sea .appspot.com en la consola
  messagingSenderId: "146009849533",
  appId: "1:146009849533:web:13edd457cfad0c721901d4",
  measurementId: "G-7369B63PT1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Analytics solo si es compatible
isSupported().then((supported) => {
    if (supported) {
        getAnalytics(app);
    }
});

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
