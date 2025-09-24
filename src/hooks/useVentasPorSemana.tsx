// hooks/useVentasPorSemana.ts
import { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { isValid, startOfMonth, addDays } from 'date-fns';

type Semana = {
  semana: string; // ej: "Semana 1"
  total: number;
  rango: string; // ej: "1 - 7"
  inicio: Date;
};

type VentasPorMes = Record<string, Semana[]>;

export const useVentasPorSemana = () => {
  const [ventasPorMes, setVentasPorMes] = useState<VentasPorMes>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'order'));
        const datosBrutos: { fecha: Date; total: number }[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          const { fecha, precioVenta } = data;

          if (!fecha || typeof precioVenta !== 'number') return;

          let fechaReal: Date;
          if (fecha instanceof Timestamp) {
            fechaReal = fecha.toDate();
          } else {
            fechaReal = new Date(fecha);
          }

          if (!isValid(fechaReal)) return;

          datosBrutos.push({ fecha: fechaReal, total: precioVenta });
        });

        // Agrupar por mes y semana
        const agrupadoPorMes: VentasPorMes = {};

        datosBrutos.forEach(({ fecha, total }) => {
          const año = fecha.getFullYear();
          const mes = fecha.getMonth();
          const claveMes = `${año}-${mes}`;

          if (!agrupadoPorMes[claveMes]) agrupadoPorMes[claveMes] = [];

          const primerDiaMes = startOfMonth(fecha);
          const diferenciaDias = Math.floor((fecha.getTime() - primerDiaMes.getTime()) / (1000 * 60 * 60 * 24));
          const indiceSemana = Math.floor(diferenciaDias / 7);

          while (agrupadoPorMes[claveMes].length <= indiceSemana) {
            const inicio = addDays(primerDiaMes, agrupadoPorMes[claveMes].length * 7);
            const fin = addDays(inicio, 6);
            agrupadoPorMes[claveMes].push({
              semana: `Semana ${agrupadoPorMes[claveMes].length + 1}`,
              total: 0,
              rango: `${inicio.getDate()} - ${fin.getDate()}`,
              inicio,
            });
          }

          agrupadoPorMes[claveMes][indiceSemana].total += total;
        });

        // Ordenar las semanas por fecha de inicio
        Object.keys(agrupadoPorMes).forEach((claveMes) => {
          agrupadoPorMes[claveMes].sort((a, b) => a.inicio.getTime() - b.inicio.getTime());
        });

        setVentasPorMes(agrupadoPorMes);
      } catch (error) {
        console.error('Error obteniendo datos:', error);
      }
    };

    fetchData();
  }, []);

  return ventasPorMes;
};