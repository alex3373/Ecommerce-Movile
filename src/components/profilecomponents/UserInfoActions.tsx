import React from "react";
import { IonList, IonItem, IonIcon, IonLabel } from "@ionic/react";
import { callOutline, locationOutline, walletOutline, starOutline } from "ionicons/icons";

interface Props {
  direccion: { calle: string; ciudad: string };
  celular: string;
}

const UserInfoActions: React.FC<Props> = ({ direccion, celular }) => (
  <div className="info-actions-section">
    <IonList lines="full" className="settings-list">
      <IonItem button detail={true}>
        <IonIcon icon={locationOutline} slot="start" color="primary" />
        <IonLabel>
          <h3>Dirección de Envío</h3>
          <p>{`${direccion.calle}, ${direccion.ciudad}`}</p>
        </IonLabel>
      </IonItem>
      <IonItem button detail={true}>
        <IonIcon icon={callOutline} slot="start" color="primary" />
        <IonLabel>
          <h3>Teléfono</h3>
          <p>{celular}</p>
        </IonLabel>
      </IonItem>
      <IonItem button detail={true}>
        <IonIcon icon={walletOutline} slot="start" color="primary" />
        <IonLabel>Métodos de Pago</IonLabel>
      </IonItem>
      <IonItem button detail={true}>
        <IonIcon icon={starOutline} slot="start" color="primary" />
        <IonLabel>Mis Reseñas</IonLabel>
      </IonItem>
    </IonList>
  </div>
);

export default UserInfoActions;