import React from "react";
import ClientOrder from "../../components/pedidoscomponents/ClientOrder";
import { IonPage, IonContent } from '@ionic/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Pedidos: React.FC = () => {
    return (
        <IonPage>
            <Header title="Órdenes" />
            <IonContent className="ion-padding">
                <ClientOrder />
            </IonContent>
            <Footer />
        </IonPage>
    );
};

export default Pedidos;