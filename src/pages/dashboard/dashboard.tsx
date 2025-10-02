import { IonContent, IonPage, IonCard, IonIcon, IonText } from '@ionic/react';
import { settingsOutline } from 'ionicons/icons';
import Header from '../../components/Header/Header';
import UserTable from '../../components/dashboardcomponents/UserTable/UserTable';
import Pagination from '../../components/dashboardcomponents/Pagination/Pagination';
import InfoCards from '../../components/dashboardcomponents/InfoCards/InfoCards';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../../utils/auth';

const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const user = getCurrentUser();
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  return (
    <IonPage>
      <Header title="Users" />
      <IonContent fullscreen className="ion-padding">
        {/* Bienvenida */}
        <div className="ion-padding" style={{ textAlign: 'center', fontSize: '17px' }}>
          <h2>👋 ¡Hola, {userName || 'bienvenido'}!</h2>
          <p>
            Nos alegra tenerte de vuelta en el panel de administración. Aquí puedes gestionar tus usuarios y ver estadísticas.
          </p>
        </div>
        {/* Tabla de usuarios */}
        <div style={{ marginBottom: '50px' }}>
          <UserTable />
        </div>


        {/* Paginación */}
        <Pagination />

        {/* Tirulo de funciones */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          margin: '32px 0',
          textAlign: 'center',
        }}>
          <IonText style={{ fontSize: '22px', fontWeight: '600', color: '#333' }}>
            Puedes revisar las siguientes funciones
          </IonText>
          <img 
            src="https://i.pinimg.com/originals/4b/06/e3/4b06e393fd0647c265b1282b0f006486.gif" 
            alt="Robot animado" 
            style={{ width: '100px', height: '100px' }} 
          />
        </div>
        
        {/* Tarjetas informativas */}
        <InfoCards />
      </IonContent>

      <div style={{ height: '80px' }}></div>
    </IonPage>
  );
};

export default Dashboard;