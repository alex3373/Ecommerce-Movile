import {
  IonPage,
  IonContent,
  IonText,
  IonIcon
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { cartOutline, lockClosedOutline } from 'ionicons/icons';
import Footer from '../components/Footer/Footer';
import DailyOffers from '../components/homecomponents/DailyOffers/DailyOffers';
import HowItWorks from '../components/homecomponents/HowItWorks/HowItWorks';

const GuestHome: React.FC = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

  const handleOfferClick = () => {
    if (!user) {
      history.push('/login');
    }
  };

  return (
    <IonPage>
      {/* Ajuste del padding inferior para que el footer no tape el contenido */}
      <IonContent className="ion-padding" style={{ '--padding-bottom': '70px' }}>
        <IonText className="guest-welcome-text">
          <div style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '1rem' }}>
            <h2
              style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#222',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <IonIcon icon={cartOutline} /> Explora nuestros productos
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: '#666',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <IonIcon icon={lockClosedOutline} /> Inicia sesión para ver precios y realizar compras personalizadas.
            </p>
          </div>
        </IonText>

        <DailyOffers onClickProduct={!user ? handleOfferClick : undefined} />
        <HowItWorks />
      </IonContent>

      <Footer />
    </IonPage>
  );
};

export default GuestHome;

