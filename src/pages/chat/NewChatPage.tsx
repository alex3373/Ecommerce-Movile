import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonButton,
  IonButtons,
  IonAlert,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  getContactsFromLocalStorage,
  saveContactsToLocalStorage,
  updateContactFavoriteStatus,
  Contact,
} from '../../services/localStorageUtils';

const NewChatPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContactId, setSelectedContactId] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);

  const history = useHistory();

  useEffect(() => {
    setContacts(getContactsFromLocalStorage());
  }, []);

  const addContact = (contact: Contact) => {
    setSelectedContactId(contact.id);
    setShowAlert(true);
  };

  const handleSaveContact = (name: string) => {
    const updatedContacts = contacts.map((c) =>
      c.id === selectedContactId ? { ...c, name } : c
    );
    saveContactsToLocalStorage(updatedContacts);
    setContacts(updatedContacts);
    setShowAlert(false);
  };

  const deleteContact = (id: string) => {
    const updatedContacts = contacts.filter((c) => c.id !== id);
    saveContactsToLocalStorage(updatedContacts);
    setContacts(updatedContacts);
  };

  const addToFavorites = (id: string) => {
    updateContactFavoriteStatus(id, true);
    const updated = getContactsFromLocalStorage();
    setContacts(updated);
  };

  const isFavorite = (id: string) => {
    const c = contacts.find((c) => c.id === id);
    return c ? c.isFavorite : false;
  };

  const goToChat = (id: string) => {
    history.push(`/chat/${id}`);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Nuevo chat</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleGoBack}>Volver</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {contacts.length === 0 ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>
            No tienes contactos agregados.
          </p>
        ) : (
          <IonList>
            {contacts.map((c) => (
              <IonItem key={c.id}>
                <IonAvatar slot="start">
                  <img src={c.avatar} alt="avatar" />
                </IonAvatar>
                <IonLabel>{c.name}</IonLabel>

                {!c.name || c.name.startsWith('Vendedor') ? (
                  <IonButton onClick={() => addContact(c)}>Añadir contacto</IonButton>
                ) : (
                  <IonButton color="danger" onClick={() => deleteContact(c.id)}>
                    Eliminar contacto
                  </IonButton>
                )}

                {!isFavorite(c.id) && (
                  <IonButton onClick={() => addToFavorites(c.id)}>
                    Añadir a favoritos
                  </IonButton>
                )}

                <IonButton onClick={() => goToChat(c.id)}>Chat</IonButton>
              </IonItem>
            ))}
          </IonList>
        )}

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Nombre del contacto"
          inputs={[
            {
              name: 'name',
              type: 'text',
              placeholder: 'Nombre personalizado',
            },
          ]}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
            },
            {
              text: 'Guardar',
              handler: (data) => {
                if (data.name.trim() !== '') {
                  handleSaveContact(data.name.trim());
                }
              },
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default NewChatPage;
