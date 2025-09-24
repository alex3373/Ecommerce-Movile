import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import "./ClientOrder.css";

const ClientOrder: React.FC = () => {
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPedidos = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const q = query(collection(db, "order"), where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const orders = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPedidos(orders);
            } catch (error) {
                console.error("Error al obtener pedidos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPedidos();
    }, []);

    return (
        <div className="client-order-container">
            <h2>📦 Mis Pedidos</h2>
            {loading ? (
                <p>Cargando pedidos...</p>
            ) : pedidos.length === 0 ? (
                <p>No tienes pedidos aún.</p>
            ) : (
                <table className="client-order-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Estado</th>
                            <th>Fecha</th>
                            <th>Precio Venta</th>
                            <th>Región</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.id}>
                                <td>{pedido.nombreProducto}</td>
                                <td>{pedido.estado}</td>
                                <td>{new Date(pedido.fecha).toLocaleDateString()}</td>
                                <td>${pedido.precioVenta}</td>
                                <td>{pedido.cliente.region}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ClientOrder;