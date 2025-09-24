import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import React from "react";

interface Props {
  title: string;
  onBack: () => void;
}

const ProductDetailHeader: React.FC<Props> = ({ title, onBack }) => (
  <IonHeader translucent>
    <IonToolbar color="primary">
      <IonButtons slot="start">
        <IonButton fill="clear" onClick={onBack}>
          <IonIcon icon={arrowBackOutline} />
        </IonButton>
      </IonButtons>
      <IonTitle>{title}</IonTitle>
    </IonToolbar>
  </IonHeader>
);

export default ProductDetailHeader;
