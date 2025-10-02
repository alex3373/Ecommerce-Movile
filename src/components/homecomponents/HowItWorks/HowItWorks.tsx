import React from 'react';
import { carOutline, cartOutline, chatbubbleEllipsesOutline, searchOutline, briefcaseOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

const HowItWorks: React.FC = () => {
  return (
    <div style={{
      backgroundColor: '#eaf4ff',
      padding: '20px',
      margin: '20px auto',
      borderRadius: '10px',
      maxWidth: '600px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#034078',
      boxShadow: '0 2px 10px rgba(3,64,120,0.1)',
    }}>
      <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
        <IonIcon icon={briefcaseOutline} /> ¿Cómo funciona nuestro Ecommerce?
      </h2>
      <p style={{ fontSize: '16px' }}>
        Te ofrecemos una experiencia de compra rápida, segura y confiable. Así funciona nuestro ecommerce:
      </p>
      <ul style={{ listStyleType: 'none', padding: 0, fontWeight: '600', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IonIcon icon={searchOutline} />
          Explora nuestro catálogo y encuentra lo que necesitas
        </li>
        <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IonIcon icon={cartOutline} />
          Agrega productos al carrito y finaliza tu compra fácilmente
        </li>
        <li style={{ margin: '10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IonIcon icon={carOutline} />
          Recibe tu pedido directamente en tu domicilio
        </li>
      </ul>
      <p style={{ marginTop: '15px', fontWeight: '600', color: '#007bff', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}
         onClick={() => window.open('https://wa.me/+56926237923', '_blank')}>
        <IonIcon icon={chatbubbleEllipsesOutline} />
        ¿Tienes preguntas? ¡Contáctanos por WhatsApp!
      </p>
    </div>
  );
};

export default HowItWorks;
