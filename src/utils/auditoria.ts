// src/utils/auditoria.ts
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

export type EventoAuditoria = {
    tipo: "Inicio de sesión" | "Registro" | "Compra" | "Cierre de sesión";
    email: string;
    fecha: string;
};

export const registrarEventoAuditoria = async (
    tipo: EventoAuditoria["tipo"],
    email: string
) => {
    const nuevoEvento: EventoAuditoria = {
        tipo,
        email,
        fecha: new Date().toISOString(),
    };

    // Opcional: guardar localmente
    const eventosPrevios = JSON.parse(
        localStorage.getItem("auditoria_logs") || "[]"
    );
    localStorage.setItem(
        "auditoria_logs",
        JSON.stringify([nuevoEvento, ...eventosPrevios])
    );

    try {
        const docRef = await addDoc(collection(db, "auditoria"), nuevoEvento);
        console.log("✅ Evento de auditoría guardado:", docRef.id);
    } catch (error) {
        console.error("❌ Error guardando evento en Firestore:", error);
    }
};
