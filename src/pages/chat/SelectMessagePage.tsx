import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import { getContactsFromLocalStorage, saveContactsToLocalStorage } from '../../services/localStorageUtils';

const SelectMessagePage: React.FC = () => {
  const history = useHistory();
  const { sellerId } = useParams<{ sellerId: string }>();

  const handleSelectMessage = (message: string) => {
    let contacts = getContactsFromLocalStorage();
    let contact = contacts.find(c => c.id === sellerId);

    if (!contact) {
      contact = {
        id: sellerId,
        name: `Vendedor ${sellerId}`,
        avatar: `https://i.pravatar.cc/150?img=${sellerId}`,
        messages: [],
        isFavorite: false,
      };
      contacts.push(contact);
    }

    // Agregar el mensaje seleccionado
    contact.messages.push({ text: message, sender: 'cliente' });

    // Actualizar y guardar
    contacts = contacts.map(c => (c.id === sellerId ? contact! : c));
    saveContactsToLocalStorage(contacts);

    // Redirigir al hilo de chat
    history.push(`/chat/${sellerId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Seleccionar mensaje</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/products" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={() => handleSelectMessage("Hola, necesito más información acerca del producto")}>
          Hola, necesito más información acerca del producto
        </IonButton>
        <IonButton expand="block" onClick={() => handleSelectMessage("Hola, tengo un problema con el producto")}>
          Hola, tengo un problema con el producto
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SelectMessagePage;
