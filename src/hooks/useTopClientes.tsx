// src/hooks/useTopClientes.ts
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

type ClienteData = {
    nombre: string;
    totalGastado: number;
};

export const useTopClientes = () => {
    const [topClientes, setTopClientes] = useState<ClienteData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDocs(collection(db, "order"));
            const clientesMap: Record<string, number> = {};
            const nombresMap: Record<string, string> = {};

            snapshot.forEach((doc) => {
                const data = doc.data();
                const correo = data.usuario; // cliente identificador
                const nombre = data.nombre;
                const total = data.precioVenta || 0;

                if (!correo) return;

                clientesMap[correo] = (clientesMap[correo] || 0) + total;
                nombresMap[correo] = nombre || correo;
            });

            const top = Object.entries(clientesMap)
                .map(([correo, totalGastado]) => ({
                    nombre: nombresMap[correo],
                    totalGastado,
                }))
                .sort((a, b) => b.totalGastado - a.totalGastado)
                .slice(0, 5);

            setTopClientes(top);
            setLoading(false);
        };

        fetchData();
    }, []);

    return { topClientes, loading };
};
