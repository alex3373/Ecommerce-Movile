import React from "react";
import ClientOrder from "../../components/pedidoscomponents/ClientOrder";
import { IonPage, IonContent } from '@ionic/react';
import Header from '../../components/common/Header/Header';

const Pedidos: React.FC = () => {
    return (
        <IonPage>
            <Header title="Órdenes" />
            <IonContent className="ion-padding">
                <ClientOrder />
            </IonContent>
        </IonPage>
    );
};

export default Pedidos;