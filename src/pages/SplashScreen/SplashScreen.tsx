// src/pages/SplashScreen/SplashScreen.tsx
import { IonPage, IonContent } from '@ionic/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      const rawUser = localStorage.getItem("usuario_actual");

      if (rawUser) {
        try {
          const user = JSON.parse(rawUser);
          if (user.role === "admin") {
            history.replace("/dashboard"); // cliente común
          }
        } catch (err) {
          console.error("Error leyendo usuario:", err);
          history.replace("/login");
        }
      } else {
        history.replace("/login");
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      <IonContent fullscreen className="ion-text-center ion-padding">
        <div className="splash-container">
          <img src="/assets/logo_crazy_family_v2.png" alt="Logo" />
          <h1>Dropshipping 2025</h1>
          <p>Preparando tu experiencia...</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreen;