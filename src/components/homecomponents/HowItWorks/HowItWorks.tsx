import React from 'react';

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
      <h2>💼 ¿Cómo funciona Crazy Family?</h2>
      <p style={{ fontSize: '16px' }}>
        Facilitamos la conexión entre productos y personas. Conoce nuestro flujo de funcionamiento:
      </p>
      <ul style={{ listStyleType: 'none', padding: 0, fontWeight: '600' }}>
        <li>🔍 Explora nuestro catálogo y selecciona los productos que necesites</li>
        <li>🛒 Realiza tu pedido de forma simple y segura</li>
        <li>🚚 Nosotros nos encargamos de la entrega directa al destino</li>
      </ul>
      <p style={{ marginTop: '15px', fontWeight: '600', color: '#007bff', cursor: 'pointer' }}
         onClick={() => window.open('https://wa.me/+56926237923', '_blank')}>
        📞 ¿Tienes preguntas? ¡Contáctanos por WhatsApp!
      </p>
    </div>
  );
};

export default HowItWorks;

