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
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  getContactsFromLocalStorage,
  saveContactsToLocalStorage,
  updateContactFavoriteStatus,
  Contact,
} from '../../services/localStorageUtils';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Contact[]>([]);
  const history = useHistory();

  useEffect(() => {
    const allContacts = getContactsFromLocalStorage();
    const favs = allContacts.filter((c) => c.isFavorite);
    setFavorites(favs);
  }, []);

  const removeFromFavorites = (id: string) => {
    updateContactFavoriteStatus(id, false);
    const updatedContacts = getContactsFromLocalStorage();
    const updatedFavorites = updatedContacts.filter((c) => c.isFavorite);
    setFavorites(updatedFavorites);
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
          <IonTitle>Contactos favoritos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleGoBack}>Volver</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {favorites.length === 0 ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>
            No tienes contactos favoritos agregados.
          </p>
        ) : (
          <IonList>
            {favorites.map((c) => (
              <IonItem key={c.id}>
                <IonAvatar slot="start">
                  <img src={c.avatar} alt="avatar" />
                </IonAvatar>
                <IonLabel>{c.name}</IonLabel>
                <IonButton color="danger" onClick={() => removeFromFavorites(c.id)}>
                  Eliminar de favoritos
                </IonButton>
                <IonButton onClick={() => goToChat(c.id)}>Chat</IonButton>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default FavoritesPage;
