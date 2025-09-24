import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Dot
} from 'recharts';
import { useVentasPorSemana } from '../../../hooks/useVentasPorSemana';

export const GraficoVentasSemanalPorMes = () => {
  const datosPorMes = useVentasPorSemana();

  const meses = Object.keys(datosPorMes).sort(
    (a, b) => new Date(a + '-01').getTime() - new Date(b + '-01').getTime()
  );

  const [mesIndex, setMesIndex] = useState(meses.length - 1);

  if (meses.length === 0) {
    return <p style={{ textAlign: 'center' }}>No hay datos disponibles.</p>;
  }

  const mesActual = meses[mesIndex];
  const semanas = datosPorMes[mesActual] || [];

  const formatNombreMes = (fecha: string) => {
    const nombre = new Date(fecha + '-01').toLocaleDateString('es-CL', {
      month: 'long',
      year: 'numeric',
    });
    return nombre.toLocaleLowerCase().replace(/^\p{Ll}/u, (l) => l.toUpperCase());
  };

  const cambiarMes = (direccion: 'anterior' | 'siguiente') => {
    setMesIndex((prev) =>
      direccion === 'anterior'
        ? Math.max(prev - 1, 0)
        : Math.min(prev + 1, meses.length - 1)
    );
  };

  const totalMes = semanas.reduce((sum, s) => sum + s.total, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const semana = payload[0].payload;
      return (
        <div style={{
          background: '#fff',
          border: '1px solid #ccc',
          padding: 10,
          borderRadius: 8,
        }}>
          <p><strong>{semana.semana}</strong></p>
          <p>Rango: {semana.rango}</p>
          <p>Ventas: ${semana.total.toLocaleString('es-CL')}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: 700,
      margin: '0 auto',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      {/* Navegación por mes */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20
      }}>
        <button
          onClick={() => cambiarMes('anterior')}
          disabled={mesIndex === 0}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 20,
            cursor: mesIndex === 0 ? 'not-allowed' : 'pointer',
            color: mesIndex === 0 ? '#ccc' : '#3498db'
          }}
        >
          ⬅️
        </button>
        <h3 style={{ margin: 0 }}>📅 {formatNombreMes(mesActual)}</h3>
        <button
          onClick={() => cambiarMes('siguiente')}
          disabled={mesIndex === meses.length - 1}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 20,
            cursor: mesIndex === meses.length - 1 ? 'not-allowed' : 'pointer',
            color: mesIndex === meses.length - 1 ? '#ccc' : '#3498db'
          }}
        >
          ➡️
        </button>
      </div>

      {/* Gráfico de líneas */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={semanas}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="semana"
            label={{
              value: 'Semanas',
              position: 'insideBottom',
              offset: -5,
              dy: 15,
              style: { fontWeight: 'bold' }
            }}
            tickFormatter={(value: string) => value.split(' ')[1]} // Solo número
          />
          <YAxis tickFormatter={(val) => `$${val.toLocaleString('es-CL')}`} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#3498db"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: '#3498db',
              stroke: '#fff',
              strokeWidth: 2
            }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Total mensual */}
      {/* Etiqueta "Semanas" y total mensual */}
      <div style={{ textAlign: 'center', marginTop: 12 }}>
        <div style={{marginBottom: 25 }}>Semanas</div>
        <div>
          <span style={{ fontWeight: 'bold' }}>Total ganado en el mes:</span>{' '}
          <span style={{ color: '#27ae60', fontWeight: 'bold' }}>
            ${totalMes.toLocaleString('es-CL')}
          </span>
        </div>
      </div>

    </div>
  );
};