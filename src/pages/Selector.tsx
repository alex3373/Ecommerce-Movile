import {
    IonPage,
    IonContent,
    IonButton,
    IonText,
    IonImg
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { useEffect } from 'react';

const Selector: React.FC = () => {
const history = useHistory();
const user = getCurrentUser();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            history.push('/home');
        }
    }, [user, history]);

    const handleGoToDashboard = () => {
        if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
    }
        history.push('/dashboard');
    };

    const handleGoToHome = () => {
        if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
        }
        history.push('/home');
    };

    return (
        <IonPage>
            <IonContent
                className="ion-padding ion-text-center"
                fullscreen
            >
                <div
                    style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    gap: '1.5rem',
                }}
                >
                <IonImg
                    src="https://www.softwareseleccion.com/blog/wp-content/uploads/2022/07/kpi-codetia.png"
                    alt="Imagen de selector"
                    style={{
                        width: '200px',
                        height: '200px',
                        objectFit: 'contain',
                    }}
                />
                <IonText>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        🧭 ¿A dónde quieres ir?
                    </h2>
                    <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                        Selecciona una opción para continuar
                    </p>
                </IonText>
            
                <IonButton
                    expand="block"
                    onClick={handleGoToDashboard}
                    style={{ width: '80%', maxWidth: '300px' }}
                >
                    📊 Dashboard Admin
                </IonButton>
            
                <IonButton
                    expand="block"
                    color="secondary"
                    onClick={handleGoToHome}
                    style={{ width: '80%', maxWidth: '300px' }}
                >
                    🏠 Ir a Home
                </IonButton>
                </div>
            </IonContent>
        </IonPage>
        );
    } ;

export default Selector;