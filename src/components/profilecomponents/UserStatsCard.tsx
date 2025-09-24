import React from "react";
import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonText } from "@ionic/react";

interface Props {
  pedidos: number;
  gastado: number;
  favoritos: number;
}

const UserStatsCard: React.FC<Props> = ({ pedidos, gastado, favoritos }) => (
  <IonCard className="stats-card">
    <IonCardContent>
      <IonGrid>
        <IonRow className="ion-justify-content-center ion-align-items-center">
          <IonCol size="4" className="ion-text-center">
            <IonText><h2>{pedidos}</h2></IonText>
            <IonText color="medium"><p>Pedidos</p></IonText>
          </IonCol>
          <IonCol size="4" className="ion-text-center">
            <IonText><h2>${gastado}</h2></IonText>
            <IonText color="medium"><p>Gastado</p></IonText>
          </IonCol>
          <IonCol size="4" className="ion-text-center">
            <IonText><h2>{favoritos}</h2></IonText>
            <IonText color="medium"><p>Favoritos</p></IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCardContent>
  </IonCard>
);

export default UserStatsCard;