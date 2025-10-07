import React from 'react';
import { IonFooter, IonToolbar } from '@ionic/react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <IonFooter>
      <IonToolbar>
        <div className="footer-container">
          <p className="footer-title">© Ecommerce 2025.</p>

          <div className="footer-row">
            <p className="class-text">
              ¿Eres usuario? <a href="/login" className="footer-link">Inicia sesión</a>
            </p>
            <p className="class-text">
              ¿No tienes cuenta? <a href="/register" className="footer-link">Regístrate</a>
            </p>
          </div>
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
