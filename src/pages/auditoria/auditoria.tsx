// src/pages/AuditoriaPage.tsx
import { IonPage, IonContent } from "@ionic/react";
import Auditoria from "../../components/dashboardcomponents/Auditoria/Auditoria";
import Header from "../../components/Header/Header";

const AuditoriaPage = () => {
    return (
        <IonPage>
            <Header title="Auditoria" />
            <IonContent className="ion-padding">
                <Auditoria />
            </IonContent>
        </IonPage>
    );
};

export default AuditoriaPage;