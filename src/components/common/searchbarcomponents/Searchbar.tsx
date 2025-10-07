import { IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/react';
import { useState, useEffect } from 'react';
import { fetchWooProductsBySearch } from '../../../services/apiEcommerce';
import './Searchbar.css';

interface SearchbarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);
  const [allProducts, setAllProducts] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    fetchWooProductsBySearch('')
      .then(products => {
        const productNames = products.map(p => p.name.toLowerCase());
        const uniqueNames = Array.from(new Set(productNames));
        setAllProducts(uniqueNames);
      })
      .catch(err => {
        console.error('Error cargando productos:', err);
        setAllProducts([]);
      });
  }, []);

  useEffect(() => {
    if (value.trim().length < 1) {
      setSuggestions([]);
      return;
    }

    const entrada = value.trim().toLowerCase();

    // Coincidencias parciales (no solo las que empiezan con la palabra)
    const productosFiltrados = allProducts
      .filter(nombre => nombre.includes(entrada))
      .sort((a, b) => a.localeCompare(b)); // Orden alfabético

    setSuggestions(productosFiltrados.slice(0, 10));
    setShowSuggestions(true);
  }, [value, allProducts]);

  const handleSearch = (term: string) => {
    if (term.trim().length > 0) {
      onSearch(term.toLowerCase());
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLIonSearchbarElement>) => {
    if (e.key === 'Enter') {
      handleSearch(value);
    }
  };

  return (
    <div className="searchbar-wrapper">
      <IonSearchbar
        placeholder="Buscar productos..."
        value={value}
        debounce={300}
        onIonInput={(e) => setValue(e.detail.value || '')}
        onIonClear={() => {
          setSuggestions([]);
          setShowSuggestions(false);
        }}
        onIonCancel={() => {
          setSuggestions([]);
          setShowSuggestions(false);
        }}
        onKeyDown={handleKeyPress} // Escucha el Enter
      />
      {showSuggestions && suggestions.length > 0 && (
        <IonList className="search-suggestions-list">
          {suggestions.map((s, i) => (
            <IonItem
              key={i}
              button
              onClick={() => {
                setValue(s);
                handleSearch(s);
              }}
            >
              <IonLabel>{s}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      )}
    </div>
  );
};

export default Searchbar;
