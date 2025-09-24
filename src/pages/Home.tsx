import { IonContent, IonPage } from '@ionic/react';
import Header from '../components/Header';
import Slider from '../components/homecomponents/Slider/Slider';
import Searchbar from '../components/searchbarcomponents/Searchbar';
import CategoryList from '../components/homecomponents/CategoryList/CategoryList';
import ProductList from '../components/homecomponents/ProductList/ProductList1';
import DailyOffers from '../components/homecomponents/DailyOffers/DailyOffers'; 
import HowItWorks from '../components/homecomponents/HowItWorks/HowItWorks'; 
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LogoutButton from '../components/Logout';

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
      <Header title='Inicio' />
      <IonContent fullscreen>
        {/* Bienvenida y botón de logout */}
        {nombreUsuario && (
          <div style={{ 
            padding: '16px', 
            fontSize: '18px', 
            fontWeight: 'bold', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <span>👋 ¡Bienvenido, {nombreUsuario}!</span>
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

        {/* Espacio para evitar que el contenido se corte con el footer */}
        <div style={{ height: '80px' }}></div>
      </IonContent>
    </IonPage>
  );
};

export default Home;