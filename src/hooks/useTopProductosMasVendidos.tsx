import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';

export interface ProductoData {
    nombre: string;
    cantidad: number;
    porcentaje: number;
}

export const useTopProductosMasVendidos = () => {
    const [productos, setProductos] = useState<ProductoData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'order'));
                const contador = new Map<string, number>();

                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const nombreProducto = data.nombreProducto;

                    if (Array.isArray(nombreProducto)) {
                        nombreProducto.forEach((nombre: string) => {
                            const nombreLimpio = nombre.trim();
                            if (nombreLimpio) {
                                contador.set(nombreLimpio, (contador.get(nombreLimpio) || 0) + 1);
                            }
                        });
                    } else if (typeof nombreProducto === 'string') {
                        const nombreLimpio = nombreProducto.trim();
                        if (nombreLimpio) {
                            contador.set(nombreLimpio, (contador.get(nombreLimpio) || 0) + 1);
                        }
                    }
                });

                const total = Array.from(contador.values()).reduce((acc, val) => acc + val, 0);

                const topProductos: ProductoData[] = Array.from(contador.entries())
                    .sort(([, a], [, b]) => b - a) // Orden descendente por cantidad
                    .slice(0, 10) // Top 10 productos
                    .map(([nombre, cantidad]) => ({
                        nombre,
                        cantidad,
                        porcentaje: parseFloat(((cantidad / total) * 100).toFixed(2)),
                    }));

                setProductos(topProductos);
            } catch (error) {
                console.error('Error al obtener productos:', error);
                setProductos([]);
            } finally {
                setLoading(false);
            }
        };

        obtenerDatos();
    }, []);

    return { productos, loading };
};