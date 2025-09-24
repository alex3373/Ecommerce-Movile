import {
    IonCard,
    IonCardContent,
    IonSpinner,
    IonText,
    IonIcon,
    IonButton
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebase';
import './OrderTable.css';
import OrderFilter from './OrderFilter';
import {
    checkmarkCircleOutline,
    warningOutline,
    closeCircleOutline,
    hourglassOutline,
    cubeOutline,
    airplaneOutline,
    mailOpenOutline
} from 'ionicons/icons';

interface Order {
    id: string;
    nombreCompleto: string;
    estado: string;
    total: number;
    fecha: string;
}

const estados = [
    'En revisión',
    'Procesando',
    'Aceptado',
    'Empaquetando',
    'Enviado',
    'Recibido'
];

const iconosEstado: Record<string, string> = {
    'En revisión': hourglassOutline,
    'Procesando': warningOutline,
    'Aceptado': checkmarkCircleOutline,
    'Empaquetando': cubeOutline,
    'Enviado': airplaneOutline,
    'Recibido': mailOpenOutline,
};

const coloresEstado: Record<string, string> = {
    'En revisión': 'medium',
    'Procesando': 'warning',
    'Aceptado': 'success',
    'Empaquetando': 'tertiary',
    'Enviado': 'primary',
    'Recibido': 'success'
};

const OrderTable: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'order'));
            const lista = snapshot.docs.map((docSnap) => {
                const data = docSnap.data();
                const cliente = data.cliente || {};
                const fecha = data.fecha
                    ? new Date(data.fecha).toLocaleDateString()
                    : 'Sin fecha';

                return {
                    id: docSnap.id,
                    nombreCompleto: `${cliente.nombre || ''} ${cliente.apellido || ''}`.trim(),
                    estado: data.estado || 'En revisión',
                    total: data.precioVenta || 0,
                    fecha,
                };
            });
            setOrders(lista);
            setFilteredOrders(lista);
        } catch (error) {
            console.error('Error al obtener órdenes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (query: string) => {
        const q = query.toLowerCase().trim();
        if (q === '') {
            setFilteredOrders(orders);
            return;
        }

        const filtered = orders.filter(
            (order) =>
                order.nombreCompleto.toLowerCase().includes(q) ||
                order.estado.toLowerCase().includes(q)
        );

        setFilteredOrders(filtered);
    };

    const avanzarEstado = async (orderId: string, estadoActual: string) => {
        const index = estados.indexOf(estadoActual);
        if (index === -1 || index === estados.length - 1) return;

        const nuevoEstado = estados[index + 1];
        try {
            const docRef = doc(db, 'order', orderId);
            await updateDoc(docRef, { estado: nuevoEstado });

            setOrders((prev) =>
                prev.map((o) =>
                    o.id === orderId ? { ...o, estado: nuevoEstado } : o
                )
            );
            setFilteredOrders((prev) =>
                prev.map((o) =>
                    o.id === orderId ? { ...o, estado: nuevoEstado } : o
                )
            );
        } catch (error) {
            console.error('Error al actualizar estado:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <IonCard className="order-table-card">
                <IonCardContent style={{ display: 'flex', justifyContent: 'center' }}>
                    <IonSpinner name="dots" />
                </IonCardContent>
            </IonCard>
        );
    }

    return (
        <IonCard className="order-table-card">
            <IonCardContent>
                <OrderFilter onFilter={handleFilter} />
                <div className="order-list">
                    {filteredOrders
                        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
                        .map((order, index) => (
                            <div className="order-card" key={order.id}>
                                <div className="order-circle">
                                    #{index + 1}
                                </div>
                                <div className="order-info">
                                    <IonText className="order-name">{order.nombreCompleto}</IonText>
                                    <IonText className="order-date">{order.fecha}</IonText>
                                    <IonText className="order-total">${order.total.toFixed(2)}</IonText>
                                </div>
                                <IonButton
                                    className="order-status-button"
                                    fill="solid"
                                    color={coloresEstado[order.estado]}
                                    onClick={() => avanzarEstado(order.id, order.estado)}
                                    size="small"
                                >
                                    <IonIcon icon={iconosEstado[order.estado]} />
                                    {order.estado}
                                </IonButton>
                            </div>
                        ))}
                </div>
            </IonCardContent>
        </IonCard>
    );
};

export default OrderTable;