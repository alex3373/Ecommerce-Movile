import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../services/firebase'; // Ajusta si tu import de auth es distinto
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import Header from '../../components/Header/Header';

interface User {
  id: string;
  nombre: string;
  telefono: string;
  email?: string;
  rol?: string;
}

interface Pago {
  id: string;
  cliente: {
    nombre: string;
  };
  precioVenta: number;
  fecha: string;
}

const Reports: React.FC = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usuariosData: User[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        setUsuarios(usuariosData);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    const checkAdminRoleAndFetchPagos = async () => {
      try {
        const userUid = auth.currentUser?.uid;
        if (!userUid) {
          console.warn('No hay usuario autenticado');
          return;
        }
        const userDocRef = doc(db, 'users', userUid);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          console.warn('Documento de usuario no encontrado');
          return;
        }

        const role = userDocSnap.data().role;
        if (role !== 'admin') {
          console.warn('Usuario no es admin, no puede ver todos los pagos');
          setPagos([]); // o manejar según convenga
          setIsAdmin(false);
          return;
        }
        setIsAdmin(true);

        // Traemos todas las órdenes porque es admin
        const querySnapshot = await getDocs(collection(db, 'order'));
        const pagosData: Pago[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          // Convertir fecha de Timestamp a string, si existe
          let fechaFormateada = 'Sin fecha';
          if (data.fecha && typeof data.fecha.toDate === 'function') {
            fechaFormateada = data.fecha.toDate().toLocaleDateString('es-CL');
          }

          return {
            id: doc.id,
            cliente: { nombre: data.cliente?.nombre || 'Desconocido' },
            precioVenta: data.precioVenta || 0,
            fecha: fechaFormateada,
          };
        });
        setPagos(pagosData);
      } catch (error) {
        console.error('Error al obtener pagos:', error);
      }
    };

    fetchUsuarios();
    checkAdminRoleAndFetchPagos();
  }, []);

  const handleExportUsuariosPDF = () => {
    const doc = new jsPDF();
    doc.text('Correos y Teléfonos de Usuarios', 14, 15);

    autoTable(doc, {
      head: [['Email', 'Teléfono']],
      body: usuarios.map((u) => [u.email || 'No disponible', u.telefono || 'No disponible']),
      startY: 20,
    });

    doc.save('usuarios.pdf');
  };

  const handleExportPagosPDF = () => {
    const doc = new jsPDF();
    doc.text('Pagos Realizados', 14, 15);

    autoTable(doc, {
      head: [['Cliente', 'Fecha', 'Monto']],
      body: pagos.map((p) => [
        p.cliente.nombre || 'Desconocido',
        p.fecha || 'No disponible',
        `$${p.precioVenta.toLocaleString()}`,
      ]),
      startY: 20,
    });

    doc.save('pagos.pdf');
  };

  return (
    <IonPage>
      <Header title="Reportes" />
      <IonContent fullscreen className="ion-padding">
        {/* Tabla de Usuarios */}
        <IonCard style={{ maxWidth: '800px', margin: '30px auto' }}>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">📋 Lista de usuarios</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  textAlign: 'center',
                }}
              >
                <thead style={{ backgroundColor: '#f4f4f4' }}>
                  <tr>
                    <th style={{ padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>Email</th>
                    <th style={{ padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>Teléfono</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                      <td style={{ padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>
                        {usuario.email || 'No disponible'}
                      </td>
                      <td style={{ padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>
                        {usuario.telefono || 'No disponible'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ion-text-center" style={{ marginTop: '1rem' }}>
              <IonButton color="primary" onClick={handleExportUsuariosPDF}>
                Exportar Usuarios a PDF
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Tabla de Pagos */}
        <IonCard style={{ maxWidth: '800px', margin: '30px auto' }}>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">💳 Pagos Realizados</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div style={{ overflowX: 'auto' }}>
              {isAdmin ? (
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    textAlign: 'center',
                  }}
                >
                  <thead style={{ backgroundColor: '#f4f4f4' }}>
                    <tr>
                      <th style={{ padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>Cliente</th>
                      <th style={{ padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>Fecha</th>
                      <th style={{ padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagos.map((pago) => (
                      <tr key={pago.id}>
                        <td style={{ padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>
                          {pago.cliente?.nombre || 'Desconocido'}
                        </td>
                        <td style={{ padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>{pago.fecha}</td>
                        <td style={{ padding: '12px', fontWeight: 'bold', border: '1px solid #ccc' }}>
                          ${pago.precioVenta.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="ion-text-center" style={{ marginTop: '1rem' }}>
                  No tienes permisos para ver los pagos.
                </p>
              )}
            </div>
            {isAdmin && (
              <div className="ion-text-center" style={{ marginTop: '1rem' }}>
                <IonButton color="secondary" onClick={handleExportPagosPDF}>
                  Exportar Pagos a PDF
                </IonButton>
              </div>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Reports;