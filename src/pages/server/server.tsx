import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonIcon,
} from '@ionic/react';
import { cloudDone, cloudOffline, warning } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../services/firebase'; 

const Server: React.FC = () => {
  const [serverStatus, setServerStatus] = useState<
    'activo' | 'fuera de línea' | 'desconocido'
  >('desconocido');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Se intenta obtener 1 documento para verificar la conexión
        const snapshot = await getDocs(collection(db, 'users'));
        if (snapshot.size >= 0) {
          setServerStatus('activo');
        }
      } catch (error) {
        console.error('Error al verificar Firestore:', error);
        setServerStatus('fuera de línea');
      }
    };

    checkConnection();
  }, []);

  const statusInfo = {
    activo: {
      color: 'success',
      icon: cloudDone,
      message: 'Firestore Database está conectada y funcionando correctamente.',
    },
    'fuera de línea': {
      color: 'danger',
      icon: cloudOffline,
      message: 'No se pudo conectar con la base de datos.',
    },
    desconocido: {
      color: 'medium',
      icon: warning,
      message: 'El estado de la base de datos no ha sido determinado.',
    },
  };

  const { color, icon, message } = statusInfo[serverStatus];

  return (
    <IonPage>
      <Header title="Estado del Servidor" />
      <IonContent
        fullscreen
        className="ion-padding ion-justify-content-center ion-align-items-center ion-text-center"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <IonCard>
          <IonCardHeader>
            <IonCardTitle style={{ marginTop: '10px' }}>
              Estado de la Base de Datos
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent style={{ textAlign: 'center' }}>
            <IonIcon icon={icon} color={color} style={{ fontSize: '48px' }} />
            <h2 style={{ marginTop: '1rem', color: `var(--ion-color-${color})` }}>
              {serverStatus.toUpperCase()}
            </h2>
            <IonText color="medium">
              <p>{message}</p>
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Server;