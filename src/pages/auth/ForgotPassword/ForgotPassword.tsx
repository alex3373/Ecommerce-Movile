import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonSpinner,
} from "@ionic/react";
import { useState } from "react";
import { resetPassword } from "../../../services/auth.service"; // Importar función "resetPassword"
import styles from "./ForgotPassword.module.css";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await resetPassword(email);
      setLoading(false);
      history.push("/login");
    } catch (err: any) {
      setError("Hubo un error al intentar restablecer la contraseña.");
      console.error("Error al restablecer la contraseña:", err);
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Restablecer Contraseña</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className={styles.logoContainer}>
          <img
            src="./assets/logo_ecommerce.png"
            alt="Logo Empresa"
            className={styles.logo}
          />
        </div>

        <form onSubmit={handleResetPassword} className={styles.form}>
          <IonItem>
            <IonLabel position="floating">Correo electrónico</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              required
            />
          </IonItem>

          {/* Mensaje de error */}
          {error && <p className={styles.error}>{error}</p>}

          <IonButton
            expand="block"
            type="submit"
            disabled={!email || loading}
            className={loading ? styles.disabledButton : ""}
          >
            {loading ? <IonSpinner name="dots" /> : "Enviar enlace"}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
