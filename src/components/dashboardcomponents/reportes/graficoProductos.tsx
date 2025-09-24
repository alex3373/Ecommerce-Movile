import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { useTopProductosMasVendidos } from '../../../hooks/useTopProductosMasVendidos';

const COLORS = [
    '#C2185B', '#1976D2', '#FFB300', '#388E3C', '#7B1FA2',
    '#F57C00', '#0288D1', '#455A64', '#E64A19', '#009688'
];

// Sector personalizado para resaltar
const renderActiveShape = (props: any) => {
    const {
        cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill
    } = props;

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 10}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    );
};

// Etiqueta personalizada para mostrar el porcentaje
const renderCustomLabel = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, percent
    } = props;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={12}
        >
            {(percent * 100).toFixed(0)}%
        </text>
    );
};

export const GraficoTortaTopProductos: React.FC = () => {
    const { productos, loading } = useTopProductosMasVendidos();
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    if (loading) {
        return <p className="text-center text-gray-500">Cargando gráfico...</p>;
    }

    if (productos.length === 0) {
        return <p className="text-center text-gray-500">No hay datos disponibles</p>;
    }

    const productosOrdenados = [...productos].sort((a, b) => b.cantidad - a.cantidad);

    const handleClick = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const productoSeleccionado = activeIndex !== null ? productosOrdenados[activeIndex] : null;

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="w-full flex flex-col items-center gap-6">
                {/* Gráfico de torta */}
                <div className="w-full max-w-md" style={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={productosOrdenados}
                                dataKey="porcentaje"
                                nameKey="nombre"
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={100}
                                paddingAngle={2}
                                onClick={handleClick}
                                activeIndex={activeIndex ?? -1}
                                activeShape={renderActiveShape}
                                label={renderCustomLabel} // 👈 Añadimos etiquetas personalizadas
                                isAnimationActive={false}
                            >
                                {productosOrdenados.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        cursor="pointer"
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Información del producto seleccionado */}
                {productoSeleccionado && (
                    <div className="bg-white rounded-xl shadow-md p-4 max-w-md w-full text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {productoSeleccionado.nombre}
                        </h3>
                        <p className="text-gray-600 text-sm mb-1">
                            <strong>Cantidad:</strong> {productoSeleccionado.cantidad} unidades
                        </p>
                        <p className="text-gray-600 text-sm">
                            <strong>Porcentaje:</strong> {productoSeleccionado.porcentaje.toFixed(2)}%
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
