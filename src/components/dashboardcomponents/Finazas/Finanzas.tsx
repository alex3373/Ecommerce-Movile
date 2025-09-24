import React, { useEffect, useState } from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonLabel,
    IonText,
    IonList,
    IonIcon,
} from '@ionic/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import moment from 'moment';
// Este ícono se parece más al de la imagen de crecimiento
import { trendingUpOutline } from 'ionicons/icons';

interface Orden {
    precioVenta: number;
    fecha: any;
    usuario: string;
}

const Finanzas: React.FC = () => {
    const [ordenes, setOrdenes] = useState<Orden[]>([]);
    const [totalIngresos, setTotalIngresos] = useState<number>(0);

    useEffect(() => {
        const obtenerOrdenes = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'order'));
                const datos = snapshot.docs.map(doc => doc.data() as Orden);
                setOrdenes(datos);
                const total = datos.reduce((acc, orden) => acc + orden.precioVenta, 0);
                setTotalIngresos(total);
            } catch (error) {
                console.error("Error al obtener las órdenes:", error);
            }
        };

        obtenerOrdenes();
    }, []);

    const formatearFecha = (fecha: any): string => {
        if (!fecha) return "Sin fecha";
        if (typeof fecha === "string" || typeof fecha === "number") {
            return moment(new Date(fecha)).format("DD/MM/YYYY");
        }
        if (fecha.toDate) {
            return moment(fecha.toDate()).format("DD/MM/YYYY");
        }
        return "Fecha no válida";
    };

    return (
        <div style={{ padding: '1rem' }}>
            <IonCard style={{ borderRadius: '20px', padding: '1rem' }}>
                <IonCardHeader>
                    <IonCardTitle style={{ textAlign: 'center' }}>
                        Ingresos Registrados
                    </IonCardTitle>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: '0.5rem'
                    }}>
                        <IonIcon icon={trendingUpOutline} style={{ color: 'green', fontSize: '32px' }} />
                        <IonText style={{ color: 'black', marginTop: '4px' }}>
                            <strong>Total ingresos:</strong>
                        </IonText>
                        <IonText style={{ color: 'green', fontSize: '20px' }}>
                            <strong>${totalIngresos.toLocaleString()}</strong>
                        </IonText>
                    </div>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        {ordenes.map((orden, index) => (
                            <div
                                key={index}
                                style={{
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '12px',
                                    marginBottom: '1rem',
                                    padding: '1rem',
                                    textAlign: 'center',
                                    backgroundColor: '#f9f9f9'
                                }}
                            >
                                <IonLabel>
                                    <IonText color="dark">
                                        <p><strong>Monto:</strong> <span style={{ color: 'green' }}>${orden.precioVenta}</span></p>
                                        <p><strong>Fecha:</strong> {formatearFecha(orden.fecha)}</p>
                                        <p><strong>Usuario:</strong> {orden.usuario}</p>
                                    </IonText>
                                </IonLabel>
                            </div>
                        ))}
                    </IonList>
                </IonCardContent>
            </IonCard>
        </div>
    );
};

export default Finanzas;