import {
    IonPage,
    IonContent,
    IonText,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import DailyOffers from '../components/homecomponents/DailyOffers/DailyOffers';
import HowItWorks from '../components/homecomponents/HowItWorks/HowItWorks';

const GuestHome: React.FC = () => {
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');

    // Función que se ejecutará al presionar "Comprar" si no hay sesión iniciada
    const handleOfferClick = () => {
        if (!user) {
            history.push('/login');
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <IonText className="guest-welcome-text">
                    <div style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '1rem' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#222' }}>
                            🛍️ Explora nuestros productos
                        </h2>
                        <p style={{ fontSize: '1rem', color: '#666' }}>
                            🔐 Inicia sesión para ver precios y realizar compras personalizadas.
                        </p>
                    </div>
                </IonText>


                {/* Se pasa el handler solo si no hay usuario */}
                <DailyOffers onClickProduct={!user ? handleOfferClick : undefined} />

                <HowItWorks />
            </IonContent>

            {/* Footer con botones de login/registro */}
            <Footer />
            <br />
            <br />
        </IonPage>
    );
};

export default GuestHome;