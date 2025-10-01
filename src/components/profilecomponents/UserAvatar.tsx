import React from "react";
import { IonAvatar, IonText, IonButton, IonIcon } from "@ionic/react";
import { createOutline } from "ionicons/icons";

interface Props {
  foto: string;
  nombre: string;
  email: string;
  onEdit: () => void;
}

const UserAvatar: React.FC<Props> = ({ foto, nombre, email, onEdit }) => (
  <div className="user-identity-section ion-text-center">
    <IonAvatar className="user-avatar">
      <img src={foto} alt="Foto de perfil" />
    </IonAvatar>
    <IonText>
      <h1 className="user-name">{nombre}</h1>
    </IonText>
    <IonText color="danger">
      <p className="user-email">{email}</p>
    </IonText>
    <IonButton
  className="edit-profile-button"
  onClick={onEdit}
  fill="outline"
  shape="round"
  color="danger"
>
  <IonIcon slot="start" icon={createOutline} />
  Editar Perfil
</IonButton>
  </div>
);

export default UserAvatar;
