// components/Mantenimiento.tsx
import { IonPage, IonContent, IonText } from '@ionic/react';

const Mantenimiento: React.FC = () => (
    <IonPage>
        <IonContent className="ion-padding ion-text-center">
            <IonText color="danger">
                <h1>🚧 Sitio en Mantenimiento</h1>
                <p>Estamos trabajando para mejorar tu experiencia. Vuelve más tarde.</p>
            </IonText>
        </IonContent>
    </IonPage>
);

export default Mantenimiento;