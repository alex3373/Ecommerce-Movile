import { IonCard, IonCardHeader, IonCardTitle, IonIcon } from '@ionic/react';
import { pencilOutline } from 'ionicons/icons';

interface Props {
  title: string;
  icon: string;
}

const SectionCard: React.FC<Props> = ({ title, icon }) => {
  return (
    <IonCard>
      <IonCardHeader className="ion-text-center">
        <IonCardTitle><IonIcon icon={pencilOutline} style={{ fontSize: '24px' }} /> {title}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default SectionCard;