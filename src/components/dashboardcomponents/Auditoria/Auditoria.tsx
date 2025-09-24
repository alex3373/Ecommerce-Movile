import React, { useEffect, useState } from "react";
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSpinner,
    IonText,
    IonInput,
    IonIcon,
    IonItem,
} from "@ionic/react";
import { searchOutline, closeCircleOutline } from "ionicons/icons";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../services/firebase";
import "./Auditoria.css";

type EventoAuditoria = {
    tipo: "Inicio de sesión" | "Registro" | "Compra" | "Cierre de sesión";
    email: string;
    fecha: string;
};

const Auditoria = () => {
    const [logs, setLogs] = useState<EventoAuditoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const obtenerEventos = async () => {
            try {
                const q = query(collection(db, "auditoria"), orderBy("fecha", "desc"));
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map((doc) => doc.data() as EventoAuditoria);
                setLogs(data);
            } catch (error) {
                console.error("Error al cargar eventos de auditoría:", error);
            } finally {
                setLoading(false);
            }
        };

        obtenerEventos();
    }, []);

    const filteredLogs = logs.filter((log) =>
        log.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        new Date(log.fecha)
            .toLocaleString("es-CL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <IonCard className="auditoria-card">
            <IonCardHeader>
                <IonCardTitle>📋 Auditoría del sistema</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonItem lines="none" className="buscador-item">
                    {!isFocused && (
                        <IonIcon icon={searchOutline} slot="start" />
                    )}
                    <IonInput
                        placeholder="Buscar por correo o fecha..."
                        value={searchTerm}
                        onIonInput={(e) => setSearchTerm(e.detail.value!)}
                        onIonFocus={() => setIsFocused(true)}
                        onIonBlur={() => setIsFocused(false)}
                    />
                    {searchTerm && (
                        <IonIcon
                            icon={closeCircleOutline}
                            slot="end"
                            className="clear-icon"
                            onClick={() => setSearchTerm("")}
                        />
                    )}
                </IonItem>

                {loading ? (
                    <IonSpinner name="dots" />
                ) : filteredLogs.length === 0 ? (
                    <IonText color="medium">No hay eventos registrados.</IonText>
                ) : (
                    <div className="tabla-auditoria">
                        <div className="fila encabezado">
                            <div className="col tipo">Tipo</div>
                            <div className="col email">Correo</div>
                            <div className="col fecha">Fecha</div>
                        </div>
                        {filteredLogs.map((log, index) => (
                            <div className="fila" key={index}>
                                <div className={`col tipo tipo-${log.tipo.replace(/\s+/g, "").toLowerCase()}`}>
                                    {log.tipo}
                                </div>
                                <div className="col email">{log.email}</div>
                                <div className="col fecha">
                                    {new Date(log.fecha).toLocaleString("es-CL", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        second: "2-digit",
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </IonCardContent>
        </IonCard>
    );
};

export default Auditoria;