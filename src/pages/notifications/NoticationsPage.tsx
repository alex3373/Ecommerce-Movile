import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonBadge,
  IonNote
} from '@ionic/react';
import { star, starOutline, trash } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useNotificationContext } from '../../context/NotificationContext';
import './NotificationsPage.css'; 

const NotificationsPage: React.FC = () => {
  const { notifications, markAsRead, deleteNotification, toggleFavorite } = useNotificationContext();
  const history = useHistory();

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
    history.push(`/notifications/${id}`);
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Notificaciones</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {notifications.length === 0 ? (
          <div className="empty-state">
            <IonNote>No tienes notificaciones aún</IonNote>
          </div>
        ) : (
          <IonList>
            {notifications.map((n) => (
              <IonItem
                key={n.id}
                lines="full"
                className="notification-item"
              >
                <IonLabel
                  onClick={() => handleNotificationClick(n.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <h2 className={n.read ? 'notification-title read' : 'notification-title'}>
                    {!n.read && <IonBadge color="danger" className="badge-nuevo">Nuevo</IonBadge>}
                    {n.title}
                  </h2>
                  <p className="notification-message">{n.message}</p>
                </IonLabel>

                <IonButton
                  slot="end"
                  fill="clear"
                  color={n.favorite ? 'warning' : 'medium'}
                  onClick={() => toggleFavorite(n.id)}
                >
                  <IonIcon icon={n.favorite ? star : starOutline} />
                </IonButton>

                <IonButton
                  slot="end"
                  fill="clear"
                  color="danger"
                  onClick={() => deleteNotification(n.id)}
                >
                  <IonIcon icon={trash} />
                </IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NotificationsPage;
