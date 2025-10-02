import { IonContent, IonPage, IonIcon } from '@ionic/react';
import Header from '../components/Header/Header';
import Slider from '../components/homecomponents/Slider/Slider';
import Searchbar from '../components/searchbarcomponents/Searchbar';
import CategoryList from '../components/homecomponents/CategoryList/CategoryList';
import ProductList from '../components/homecomponents/ProductList/ProductList1';
import DailyOffers from '../components/homecomponents/DailyOffers/DailyOffers'; 
import HowItWorks from '../components/homecomponents/HowItWorks/HowItWorks'; 
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LogoutButton from '../components/Logout/Logout';

// Importar iconos de Ionicons
import { storefrontOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  const [nombreUsuario, setNombreUsuario] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario_actual') || 'null');
    if (usuario && usuario.name) {
      setNombreUsuario(usuario.name);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/home') {
      setSearchValue('');
    }
  }, [location.pathname]);

  return (
    <IonPage>
      <Header title="Inicio" />
      <IonContent fullscreen>
        {/* Bienvenida y botón de logout */}
        {nombreUsuario && (
          <div
            style={{
              padding: '16px',
              fontSize: '18px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IonIcon icon={storefrontOutline} style={{ fontSize: '1.6rem', color: '#0A9396' }} />
              <span>¡Bienvenido, {nombreUsuario}!</span>
            </div>
            <LogoutButton />
          </div>
        )}

        {/* Barra de búsqueda */}
        <Searchbar
          initialValue={searchValue}
          onSearch={(q) => {
            setSearchValue(q);
            if (q.trim()) {
              history.push(`/productos?search=${encodeURIComponent(q)}`);
            } else {
              history.push('/home');
            }
          }}
        />

        {/* Secciones principales */}
        <Slider />
        <CategoryList />
        <ProductList />
        <DailyOffers />
        <HowItWorks />

        <div style={{ height: '80px' }}></div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
