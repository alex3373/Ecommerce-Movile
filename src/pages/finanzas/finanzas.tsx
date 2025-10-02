import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import Finanzas from '../../components/dashboardcomponents/Finazas/Finanzas';
import Header from '../../components/Header/Header';

const PaginaFinanzas: React.FC = () => {
    return (
        <IonPage>
            <Header title="Finanzas" />
            <IonContent>
                <Finanzas />
            </IonContent>
        </IonPage>
    );
};

export default PaginaFinanzas;