import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import { brushOutline, pricetagOutline, helpCircleOutline } from 'ionicons/icons';
import './InfoCards.css';

const cards = [
  {
    icon: brushOutline,
    title: 'Modificar Banner',
    description: 'Modifica el Banner a tu medida según las ofertas que desees mostrar.',
  },
  {
    icon: pricetagOutline,
    title: 'Modificar Ofertas Home',
    description: 'Modifica los productos en Oferta que aparecen al inicio.',
  },
  {
    icon: helpCircleOutline,
    title: 'Modificar "Cómo Funciona"',
    description: 'Modifica el párrafo con instrucciones de uso según políticas o marketing actuales.',
  },
];

const InfoCards: React.FC = () => {
  return (
    <div className="info-cards-container">
      {cards.map((card, index) => (
        <IonCard key={index} className="info-card">
          <IonCardHeader className="info-card-header">
            <IonIcon icon={card.icon} className="info-card-icon" />
            <IonCardTitle>{card.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="info-card-content">
            {card.description}
          </IonCardContent>
        </IonCard>
      ))}
    </div>
  );
};

export default InfoCards;