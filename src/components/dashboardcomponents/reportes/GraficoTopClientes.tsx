import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { useTopClientes } from "../../../hooks/useTopClientes";

const COLORS = ["#C2185B", "#1976D2", "#FFB300", "#388E3C", "#7B1FA2"];

export const GraficoTopClientes: React.FC = () => {
    const { topClientes, loading } = useTopClientes();

    if (loading) return <p>Cargando datos...</p>;
    if (topClientes.length === 0) return <p>No hay datos para mostrar</p>;

    const data = topClientes.map((cliente, index) => ({
        ...cliente,
        color: COLORS[index % COLORS.length],
        indice: index + 1, // Aquí agregamos el número para mostrar en el eje X
    }));

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            {/* Gráfico */}
            <div style={{ width: "100%", maxWidth: 600, height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis
                            dataKey="indice" // Mostrar números en vez de nombres o correos
                            interval={0}
                            height={50}
                            tick={{ fontSize: 14 }}
                        />
                        <YAxis />
                        <Tooltip
                            formatter={(value: any) => `$${value.toLocaleString("es-CL")}`}
                            labelFormatter={(label) => `Cliente #${label}`}
                        />
                        <Bar dataKey="totalGastado">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Leyenda debajo */}
            <div style={{ textAlign: "center" }}>
                <h4>Clientes</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
                    {data.map((cliente, index) => (
                        <li
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontSize: 14,
                            }}
                        >
                            <div
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: cliente.color,
                                    borderRadius: 4,
                                }}
                            />
                            <span>{cliente.nombre}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
