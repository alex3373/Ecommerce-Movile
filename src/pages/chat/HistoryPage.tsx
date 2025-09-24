import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonButtons,
  IonButton,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Contact, getContactsFromLocalStorage } from '../../services/localStorageUtils';

const HistoryPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const history = useHistory();

  useEffect(() => {
    const savedContacts = getContactsFromLocalStorage();
    setContacts(savedContacts);
  }, []);

  const handleOpenChat = (id: string) => {
    history.push(`/chat/${id}`);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Historial de chats</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleGoBack}>Volver</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {contacts.map(contact => (
            <IonItem key={contact.id} button onClick={() => handleOpenChat(contact.id)}>
              <IonAvatar slot="start">
                <img src={contact.avatar} alt="avatar" />
              </IonAvatar>
              <IonLabel>{contact.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HistoryPage;
