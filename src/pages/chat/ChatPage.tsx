import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonAvatar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { getContactsFromLocalStorage, Contact } from '../../services/localStorageUtils';
import Header from '../../components/Header';

const ChatPage: React.FC = () => {
  const [recentChats, setRecentChats] = useState<Contact[]>([]);
  const [segment, setSegment] = useState<string>('recent');
  const history = useHistory();

  useEffect(() => {
    const contacts = getContactsFromLocalStorage();
    const sorted = [...contacts].reverse().slice(0, 5);
    setRecentChats(sorted);
  }, []);

  const handleSegmentChange = (value: string) => {
    setSegment(value);
    if (value === 'new') {
      history.push('/new-chat');
    } else if (value === 'history') {
      history.push('/history');
    } else if (value === 'favorites') {
      history.push('/favorites');
    }
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <Header title="Chat" />
      <IonContent>
        <IonSegment
          value={segment}
          onIonChange={(e) => {
            const value = String(e.detail.value);
            handleSegmentChange(value);
          }}
        >
          <IonSegmentButton value="new">
            <IonLabel>Nuevo chat</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="history">
            <IonLabel>Historial de chats</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="favorites">
            <IonLabel>Contactos favoritos</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <h3 style={{ margin: '15px' }}>Chats recientes</h3>

        <IonList>
          {recentChats.map((c) => (
            <IonItem key={c.id} button onClick={() => history.push(`/chat/${c.id}`)}>
              <IonAvatar slot="start">
                <img src={c.avatar} alt="avatar" />
              </IonAvatar>
              <IonLabel>{c.name}</IonLabel>
            </IonItem>
          ))}
          {recentChats.length === 0 && (
            <p style={{ margin: '15px' }}>No hay chats recientes.</p>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ChatPage;
