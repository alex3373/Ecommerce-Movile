// src/pages/auth/Login/Login.tsx
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonSpinner,
  IonToast,
  IonHeader,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { useState } from "react";
import styles from "./Login.module.css";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../../services/auth.service";
import { registrarEventoAuditoria } from "../../../utils/auditoria";
import Header from '../../../components/Header/Header';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = await loginUser(email, password);
      localStorage.setItem("usuario_actual", JSON.stringify(userData));

      // 👇 Registrar evento de auditoría
      await registrarEventoAuditoria("Inicio de sesión", userData.email);

      if (userData.role === "admin") {
        history.push("/selector");
      } else {
        history.push("/home");
      }
    } catch (err: any) {
      setError("Correo o contraseña incorrectos.");
      setShowToast(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <Header title="Iniciar Sesión" />
      
      <IonContent className="ion-padding">
        <div className={styles.logoContainer}>
          <img src="./assets/logo_ecommerce.png" alt="Logo Empresa" className={styles.logo} />
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <IonItem>
            <IonLabel position="floating">Correo electrónico</IonLabel>
            <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} required />
          </IonItem>

          {error && <p className={styles.error}>{error}</p>}

          <IonText className={styles.forgotPasswordLink}>
            <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
          </IonText>

          <IonButton
            expand="block"
            type="submit"
            disabled={!email || password.length < 6 || loading}
            color="primary" // <-- usa tu color definido en :root
            className={(!email || password.length < 6 || loading) ? styles.disabledButton : ""}
          >
            {loading ? <IonSpinner name="dots" /> : "Iniciar sesión"}
          </IonButton>


          <IonText className={styles.registerPrompt}>
            <p>¿No tienes cuenta? Únete a nuestra familia aquí</p>
          </IonText>

          <IonButton expand="block" onClick={() => history.push("/register")} className={styles.registerButton}>
            Registrarse
          </IonButton>
        </form>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={error || ""}
          duration={3000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;