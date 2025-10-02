import React, { useState } from 'react';
import { IonIcon, IonPopover, IonContent } from '@ionic/react';
import { notificationsOutline } from 'ionicons/icons';
import { useNotificationContext } from '../../context/NotificationContext';
import { useHistory } from 'react-router-dom';
import './NotificationButton.css';

const NotificationButton: React.FC = () => {
  const { notifications } = useNotificationContext();
  const unreadCount = notifications.filter(n => !n.read).length;
  const history = useHistory();

  const [showPopover, setShowPopover] = useState(false);
  const [event, setEvent] = useState<MouseEvent | undefined>();

  return (
    <div className="notification-container">
        <IonIcon
    icon={notificationsOutline}
    size="large"
    style={{ cursor: 'pointer', color: 'var(--ion-color-primary)' }}
    onClick={(e) => {
      setEvent(e.nativeEvent);
      setShowPopover(true);
    }}
  />
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}

      <IonPopover
        isOpen={showPopover}
        event={event}
        onDidDismiss={() => setShowPopover(false)}
      >
        <IonContent className="popover-content">
          <button
            className="view-all-button"
            onClick={() => {
              setShowPopover(false);
              history.push("/notifications");
            }}
          >
            Ver todas
          </button>

          {notifications.length === 0 ? (
            <p className="empty-notification">No hay notificaciones</p>
          ) : (
            notifications.slice(0, 5).map((n) => (
              <div key={n.id} className="notification-item">
                <strong>{n.title}</strong>
                <p>{n.message}</p>
              </div>
            ))
          )}
        </IonContent>
      </IonPopover>
    </div>
  );
};

export default NotificationButton;
