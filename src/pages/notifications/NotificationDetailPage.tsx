import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonLabel,
  IonButton
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { useNotificationContext } from '../../context/NotificationContext';

const NotificationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { notifications, markAsRead } = useNotificationContext();
  const [notification, setNotification] = useState<null | typeof notifications[0]>(null);
  const history = useHistory();

  useEffect(() => {
    const found = notifications.find((n) => n.id === id);
    if (found) {
      markAsRead(id);
      setNotification(found);
    }
  }, [id, notifications, markAsRead]);

  if (!notification) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/notifications" />
            </IonButtons>
            <IonTitle>Detalle</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <h2>Notificación no encontrada</h2>
          <IonButton expand="block" onClick={() => history.goBack()}>
            Volver
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/notifications" />
          </IonButtons>
          <IonTitle>Detalle</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{notification.title}</h2>
        <IonLabel>{notification.message}</IonLabel>
        <p style={{ marginTop: '10px', color: '#666' }}>
          Tipo: {notification.type?? 'general'} <br />
          Rol: {notification.role?? 'cliente'}
        </p>
      </IonContent>
    </IonPage>
  );
};


export default NotificationDetailPage;
