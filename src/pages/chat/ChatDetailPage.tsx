import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonFooter,
  IonButtons,
  IonAlert,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import './ChatPage.css';
import { getContactsFromLocalStorage, saveContactsToLocalStorage } from '../../services/localStorageUtils';

type Contact = {
  id: string;
  name: string;
  avatar: string;
  messages: { text: string; sender: string }[];
};

const defaultConversations: Record<string, { text: string; sender: string }[]> = {
  '1': [
    { text: '¡Hola! Soy Vendedor 1', sender: 'vendedor' },
    { text: '¿Cómo puedo ayudarte?', sender: 'vendedor' },
  ],
  '2': [
    { text: '¡Hola! Soy Vendedor 2', sender: 'vendedor' },
    { text: '¿Estás buscando algún producto?', sender: 'vendedor' },
  ],
  '3': [
    { text: '¡Hola! Soy Vendedor 3', sender: 'vendedor' },
    { text: 'Gracias por contactarme.', sender: 'vendedor' },
  ],
  '4': [
    { text: '¡Hola! Soy Vendedor 4', sender: 'vendedor' },
    { text: '¿Qué necesitas?', sender: 'vendedor' },
  ],
  '5': [
    { text: '¡Hola! Soy Vendedor 5', sender: 'vendedor' },
    { text: 'Te ayudo en lo que necesites.', sender: 'vendedor' },
  ],
  '6': [
    { text: '¡Hola! Soy Vendedor 6', sender: 'vendedor' },
    { text: 'Estoy disponible para consultas.', sender: 'vendedor' },
  ],
};

const ChatDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(defaultConversations[id] || []);
  const [newMessage, setNewMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>('');
  const [isContactSaved, setIsContactSaved] = useState<boolean>(false);

  useEffect(() => {
    const contacts: Contact[] = getContactsFromLocalStorage();
    const contact = contacts.find((c: Contact) => c.id === id);
    if (contact) {
      setMessages(contact.messages);
      setContactName(contact.name);
      setIsContactSaved(true);
    } else {
      setContactName(`Vendedor ${id}`);
    }
  }, [id]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const msg = { text: newMessage, sender: 'cliente' };
    const updatedMsgs = [...messages, msg];
    setMessages(updatedMsgs);

    const contacts: Contact[] = getContactsFromLocalStorage();
    const contact = contacts.find((c: Contact) => c.id === id);
    if (contact) {
      contact.messages = updatedMsgs;
      saveContactsToLocalStorage([...contacts.filter(c => c.id !== id), contact]);
    }
    setNewMessage('');
  };

  const handleAddContact = () => {
    setShowAlert(true);
  };

  const saveContactWithName = (name: string) => {
    const contacts: Contact[] = getContactsFromLocalStorage();
    const exists = contacts.find((c: Contact) => c.id === id);
    if (!exists) {
      const newContact: Contact = {
        id,
        name: name || `Vendedor ${id}`,
        avatar: `https://i.pravatar.cc/150?img=${id}`,
        messages: messages,
      };
      saveContactsToLocalStorage([...contacts, newContact]);
      setContactName(newContact.name);
      setIsContactSaved(true);
      alert(`Contacto guardado con el nombre "${newContact.name}"`);
    } else {
      alert(`El contacto ya está guardado`);
    }
  };

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>{contactName}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleGoBack}>Volver</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="chat-container">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble ${msg.sender === 'cliente' ? 'bubble-client' : 'bubble-vendor'}`}>
              {msg.text}
            </div>
          ))}
        </div>

        {!isContactSaved && (
          <div style={{ padding: '10px' }}>
            <IonButton expand="block" color="secondary" onClick={handleAddContact}>
              Agregar contacto
            </IonButton>
          </div>
        )}

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Nombre del contacto"
          inputs={[{ name: 'name', type: 'text', placeholder: 'Nombre personalizado' }]}
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            {
              text: 'Guardar',
              handler: (data) => {
                saveContactWithName(data.name);
                setShowAlert(false);
              },
            },
          ]}
        />
      </IonContent>

      <IonFooter>
        <div style={{ display: 'flex', padding: '10px' }}>
          <IonInput
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onIonChange={(e) => setNewMessage(e.detail.value!)}
            clearInput
          />
          <IonButton onClick={handleSendMessage}>Enviar</IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default ChatDetailPage;
