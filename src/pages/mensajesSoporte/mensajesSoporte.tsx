import {
    IonPage,
    IonContent,
    IonSpinner,
    IonText,
    IonCard,
    IonCardContent,
    IonAvatar,
    IonLabel,
    useIonAlert
} from "@ionic/react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import Header from "../../components/Header/Header";
import "./MensajesSoporte.css";

interface Mensaje {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: any;
}

const MensajesSoporte: React.FC = () => {
    const [mensajes, setMensajes] = useState<Mensaje[]>([]);
    const [loading, setLoading] = useState(true);
    const [presentAlert] = useIonAlert();

    useEffect(() => {
        const obtenerMensajes = async () => {
            try {
                const mensajesRef = collection(db, "messages");
                const q = query(mensajesRef, orderBy("createdAt", "desc"));
                const snapshot = await getDocs(q);

                const mensajesData: Mensaje[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...(doc.data() as Omit<Mensaje, "id">),
                }));

                setMensajes(mensajesData);
            } catch (error) {
                console.error("Error al obtener mensajes:", error);
            } finally {
                setLoading(false);
            }
        };

        obtenerMensajes();
    }, []);

    const eliminarMensaje = async (id: string) => {
        presentAlert({
            header: "¿Eliminar mensaje?",
            message: "Esta acción no se puede deshacer.",
            buttons: [
                "Cancelar",
                {
                    text: "Eliminar",
                    handler: async () => {
                        try {
                            await deleteDoc(doc(db, "messages", id));
                            setMensajes((prev) => prev.filter((msg) => msg.id !== id));
                            presentAlert("✅ Mensaje eliminado correctamente.");
                        } catch (error) {
                            console.error("Error al eliminar:", error);
                            presentAlert("❌ Error al eliminar el mensaje.");
                        }
                    },
                },
            ],
        });
    };

    return (
        <IonPage>
            <Header title="Mensajes de Soporte" />
            <IonContent className="ion-padding">
                {loading ? (
                    <IonSpinner name="dots" />
                ) : mensajes.length === 0 ? (
                    <IonText>
                        <p>No hay mensajes disponibles.</p>
                    </IonText>
                ) : (
                    mensajes.map((msg) => (
                        <IonCard key={msg.id} className="soporte-card" style={{ textAlign: "center" }}>
                            <IonCardContent>
                                {/* Avatar */}
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
                                    <IonAvatar style={{ width: "70px", height: "70px" }}>
                                        <img
                                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${msg.name || "U"}`}
                                            alt="Avatar"
                                        />
                                    </IonAvatar>
                                </div>

                                {/* Datos del mensaje */}
                                <IonLabel>
                                    <h2 style={{ marginBottom: "6px" }}>{msg.name}</h2>
                                    <p style={{ fontSize: "14px", margin: "4px 0" }}>📧 {msg.email}</p>
                                    <p style={{ fontSize: "13px", color: "gray", margin: "4px 0" }}>
                                        🕒{" "}
                                        {msg.createdAt?.seconds
                                            ? new Date(msg.createdAt.seconds * 1000).toLocaleString()
                                            : "Sin fecha"}
                                    </p>
                                    <p style={{ fontSize: "15px", marginTop: "12px" }}>💬 {msg.message}</p>
                                </IonLabel>

                                {/* Botones */}
                                <div style={{ marginTop: "16px", display: "flex", justifyContent: "center", gap: "16px" }}>
                                    <a
                                        href={`mailto:${msg.email}`}
                                        style={{ textDecoration: "none" }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <button
                                            style={{
                                                backgroundColor: "#3880ff",
                                                color: "white",
                                                borderRadius: "8px",
                                                padding: "6px 12px",
                                                border: "none",
                                                cursor: "pointer"
                                            }}
                                        >
                                            ✉️ Responder
                                        </button>
                                    </a>
                                    <button
                                        onClick={() => eliminarMensaje(msg.id)}
                                        style={{
                                            backgroundColor: "#eb445a",
                                            color: "white",
                                            borderRadius: "8px",
                                            padding: "6px 12px",
                                            border: "none",
                                            cursor: "pointer"
                                        }}
                                    >
                                        🗑️ Eliminar
                                    </button>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    ))
                )}
            </IonContent>
        </IonPage>
    );
};

export default MensajesSoporte;