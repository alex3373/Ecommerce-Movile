import React from "react";
import { registrarEventoAuditoria } from "../../utils/auditoria";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";

const LogoutButton: React.FC = () => {
    const handleLogout = async () => {
        const usuario = JSON.parse(localStorage.getItem("usuario_actual") || "null");

        if (usuario?.email) {
            await registrarEventoAuditoria("Cierre de sesión", usuario.email);
        }

        try {
            await signOut(auth); // 👈 Cierra la sesión en Firebase también
            localStorage.removeItem("usuario_actual");
            console.log("✅ Sesión cerrada correctamente");
            window.alert("Sesión cerrada exitosamente");
            window.location.href = "/";
        } catch (error) {
            console.error("❌ Error al cerrar sesión:", error);
        }
    };

    return (
        <button
            style={{
                padding: "10px 20px",
                backgroundColor: "#ff4d4d",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
            }}
            onClick={handleLogout}
        >
            Cerrar sesión
        </button>
    );
};

export default LogoutButton;
