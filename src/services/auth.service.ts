// src/services/auth.service.ts
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  UserCredential,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

// Registro y guardado en Firestore
export const registerUser = async (
  email: string,
  password: string,
  additionalData: {
    name: string;
    lastName: string;
    phone: string;
    address: string;
    birthDate: string;
    role?: string;
    photoURL?: string; 
  }
): Promise<void> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const userData = {
      uid,
      email,
      role: additionalData.role || "cliente",
      name: additionalData.name,
      lastName: additionalData.lastName,
      phone: additionalData.phone,
      address: additionalData.address,
      birthDate: additionalData.birthDate,
      photoURL: additionalData.photoURL || "", 
      createdAt: new Date(),
      activo: true
    };

    await setDoc(doc(db, "users", uid), userData);
    console.log("Usuario registrado y guardado en Firestore");
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error;
  }
};

// Login con verificación en Firestore
export const loginUser = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, "users", uid));
    if (!userDoc.exists()) {
      throw new Error("Usuario no encontrado en Firestore.");
    }

    const userData = userDoc.data();

    // Validación adicional opcional
    if (!userData?.activo) {
      throw new Error("Tu cuenta está desactivada.");
    }

    return {
      uid,
      ...userData
    };
  } catch (error) {
    console.error("Error en login:", error);
    throw error;
  }
};

// Logout
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
    localStorage.removeItem("usuario_actual");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};

// Reset contraseña
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error al enviar reset:", error);
    throw error;
  }
};