export type Contact = {
  id: string;
  name: string;
  avatar: string;
  messages: { text: string; sender: string }[];
  isFavorite?: boolean; // ⚡ Nuevo campo opcional
};

const CONTACTS_KEY = 'contacts';
const FAVORITES_KEY = 'favorites';

export const getContactsFromLocalStorage = (): Contact[] => {
  const data = localStorage.getItem(CONTACTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveContactsToLocalStorage = (contacts: Contact[]) => {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
};

export const removeContactFromLocalStorage = (id: string) => {
  const contacts = getContactsFromLocalStorage();
  const updated = contacts.filter(c => c.id !== id);
  saveContactsToLocalStorage(updated);
};

export const getFavoritesFromLocalStorage = (): Contact[] => {
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveFavoritesToLocalStorage = (favorites: Contact[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const updateContactFavoriteStatus = (id: string, isFav: boolean) => {
  const contacts = getContactsFromLocalStorage();
  const updatedContacts = contacts.map(c =>
    c.id === id ? { ...c, isFavorite: isFav } : c
  );
  saveContactsToLocalStorage(updatedContacts);

  // Actualizar lista de favoritos
  if (isFav) {
    const favorites = getFavoritesFromLocalStorage();
    const contactToAdd = updatedContacts.find(c => c.id === id);
    if (contactToAdd && !favorites.find(f => f.id === id)) {
      saveFavoritesToLocalStorage([...favorites, contactToAdd]);
    }
  } else {
    const favorites = getFavoritesFromLocalStorage().filter(f => f.id !== id);
    saveFavoritesToLocalStorage(favorites);
  }
};