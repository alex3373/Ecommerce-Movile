import { IonInput, IonIcon } from '@ionic/react';
import { searchOutline } from 'ionicons/icons';
import { useState } from 'react';
import './UserFilter.css';

interface Props {
  onFilter: (query: string) => void;
}

const UserFilter: React.FC<Props> = ({ onFilter }) => {
  const [query, setQuery] = useState('');

  const handleChange = (value: string) => {
    setQuery(value);
    onFilter(value); // ✅ También se llama con cadena vacía
  };

  return (
    <div className="search-bar">
      <IonInput
        value={query}
        placeholder="Buscar usuario por nombre o correo..."
        onIonChange={(e) => handleChange(e.detail.value!)}
        clearInput
        className="search-input"
      />
      <IonIcon icon={searchOutline} className="search-icon" />
    </div>
  );
};

export default UserFilter;