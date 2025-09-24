import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonAvatar,
  IonCard,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import {
  pencilOutline,
  callOutline,
  locationOutline,
  calendarOutline,
  mailOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { auth, db } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import Header from "../../components/Header";
import "./UserProfile.css";

const UserProfile: React.FC = () => {
  const history = useHistory();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };
    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    history.push("/edit-profile");
  };

  return (
    <IonPage>
      <Header title="Mi Perfil" />
      <IonContent fullscreen className="profile-page-content">
        {/* --- Fondo decorativo del header --- */}
        <div className="profile-header-background"></div>

        {/* --- Contenedor principal del perfil --- */}
        <div className="profile-content-wrapper">
          <IonCard className="profile-main-card">
            <IonCardContent>
              <div className="profile-avatar-section">
                <IonAvatar className="profile-avatar">
                  <img
                    src={userData?.photoURL || "/assets/avatar-default.png"}
                    alt="Avatar"
                  />
                </IonAvatar>
                <div className="profile-identity">
                  <h1 className="profile-name">
                    {userData?.name} {userData?.lastName}
                  </h1>
                  <p className="profile-email">
                    <IonIcon icon={mailOutline} style={{ marginRight: 6 }} />
                    {userData?.email}
                  </p>
                </div>
                <IonButton
                  className="edit-profile-button"
                  expand="block"
                  fill="outline"
                  onClick={handleEditProfile}
                  style={{ marginTop: 12 }}
                >
                  <IonIcon icon={pencilOutline} slot="start" />
                  Editar Perfil
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>

          {/* --- Tarjeta con los detalles del usuario --- */}
          <IonCard className="profile-details-card">
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="12" size-md="6">
                    <IonItem lines="none" className="profile-field">
                      <IonIcon icon={callOutline} slot="start" color="primary" />
                      <div className="profile-field-row">
                        <span className="profile-field-key">Teléfono:</span>
                        <span className="profile-field-value">
                          {userData?.phone || "No registrado"}
                        </span>
                      </div>
                    </IonItem>
                  </IonCol>
                  <IonCol size="12" size-md="6">
                    <IonItem lines="none" className="profile-field">
                      <IonIcon icon={locationOutline} slot="start" color="primary" />
                      <div className="profile-field-row">
                        <span className="profile-field-key">Dirección:</span>
                        <span className="profile-field-value">
                          {userData?.address || "No registrada"}
                        </span>
                      </div>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" size-md="6">
                    <IonItem lines="none" className="profile-field">
                      <IonIcon icon={calendarOutline} slot="start" color="primary" />
                      <div className="profile-field-row">
                        <span className="profile-field-key">Fecha de nacimiento:</span>
                        <span className="profile-field-value">
                          {userData?.birthDate || "No registrada"}
                        </span>
                      </div>
                    </IonItem>
                  </IonCol>
                  {/* Puedes agregar más campos aquí si lo necesitas */}
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;