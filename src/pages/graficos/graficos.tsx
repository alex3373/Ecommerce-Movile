import {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
} from '@ionic/react';
import { GraficoVentasSemanalPorMes } from '../../components/dashboardcomponents/reportes/reportes';
import { GraficoTortaTopProductos } from '../../components/dashboardcomponents/reportes/graficoProductos';
import Header from '../../components/Header';
import { GraficoTopClientes } from '../../components/dashboardcomponents/reportes/GraficoTopClientes';

const Reports: React.FC = () => {
    return (
        <IonPage>
            <Header title="Gráficos" />
            <IonContent className="ion-padding">
                {/* Card para gráfico de barras por semana */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Ventas mensuales</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <GraficoVentasSemanalPorMes />
                    </IonCardContent>
                </IonCard>

                {/* Card para gráfico de torta de productos */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Productos Más Vendidos</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <GraficoTortaTopProductos />
                    </IonCardContent>
                </IonCard>

                {/* Crad para gráfico de barras de clientes */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Clientes con más compras</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <GraficoTopClientes />
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Reports;