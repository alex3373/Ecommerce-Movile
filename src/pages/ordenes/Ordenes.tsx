import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import OrderTable from '../../components/dashboardcomponents/OrdenesTable/OrderTable';

const Ordenes: React.FC = () => {
    return (
        <IonPage>
            <Header title="Órdenes" />
            <IonContent className="ion-padding">
                <OrderTable />
            </IonContent>
        </IonPage>
    );
};

export default Ordenes;