// UserProfile.tsx
import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonAvatar,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
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
import Header from "../../components/Header/Header";
import "./UserProfile.css";

// Si prefieres ocultar el avatar por completo, cámbialo a true
const HIDE_AVATAR = true;

const UserProfile: React.FC = () => {
  const history = useHistory();
  const [userData, setUserData] = useState<any>(null);
  const [imgError, setImgError] = useState(false);

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

  const hasPhoto = !!userData?.photoURL && !imgError;

  return (
    <IonPage>
      <Header title="Mi Perfil" />
      <IonContent fullscreen className="profile-page-content">
        {/* --- Fondo decorativo del header --- */}
        <div className="profile-header-background" />

        {/* --- Contenedor principal del perfil --- */}
        <div className="profile-content-wrapper">
          <IonCard className="profile-main-card">
            <IonCardContent>
              <div className="profile-avatar-section">
                {/* Avatar: si existe photoURL lo mostramos, si no mostramos fallback SVG */}
                {!HIDE_AVATAR && (
                  <div className="profile-avatar-wrapper">
                    {hasPhoto ? (
                      <IonAvatar className="profile-avatar">
                        <img
                          src={userData?.photoURL}
                          alt="Avatar"
                          onError={() => setImgError(true)}
                        />
                      </IonAvatar>
                    ) : (
                      <div
                        className="profile-avatar profile-avatar--fallback"
                        aria-hidden
                        title="Avatar genérico"
                      >
                        {/* simple SVG estilo caricatura / icono de usuario */}
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                          aria-label="Avatar genérico"
                        >
                          <rect width="24" height="24" rx="12" fill="#E8F6F4" />
                          <g transform="translate(4,4)">
                            <circle cx="8" cy="5.5" r="3.2" fill="#BFEFE7" />
                            <path
                              d="M0.5,15 C0.5,11.5 7.5,11.5 15.5,11.5 C15.5,11.5 18,11.5 18,15.5 L18,17 L0.5,17 Z"
                              fill="#BFEFE7"
                            />
                          </g>
                        </svg>
                      </div>
                    )}
                  </div>
                )}

                <div className="profile-identity">
                  <h1 className="profile-name">
                    {userData?.name || "Nombre"} {userData?.lastName || ""}
                  </h1>
                  <p className="profile-email">
                    <IonIcon icon={mailOutline} style={{ marginRight: 6 }} />
                    {userData?.email || "email@ejemplo.com"}
                  </p>
                </div>

                <IonButton
                  className="edit-profile-button"
                  expand="block"
                  fill="outline"
                  color="danger"
                  onClick={handleEditProfile}
                >
                  <IonIcon icon={pencilOutline} slot="start" /> Editar Perfil
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
                      <IonIcon icon={callOutline} slot="start" color="danger" />
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
                      <IonIcon icon={locationOutline} slot="start" color="danger" />
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
                      <IonIcon icon={calendarOutline} slot="start" color="danger" />
                      <div className="profile-field-row">
                        <span className="profile-field-key">Fecha de nacimiento:</span>
                        <span className="profile-field-value">
                          {userData?.birthDate || "No registrada"}
                        </span>
                      </div>
                    </IonItem>
                  </IonCol>
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
