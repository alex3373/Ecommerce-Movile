import React from 'react';
import {
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonIcon
} from '@ionic/react';

import {
  homeOutline,
  cartOutline,
  personOutline,
  chatboxOutline,
  informationCircleOutline,
  cashOutline,
  peopleOutline,
  settingsOutline,
  documentTextOutline,
  serverOutline,
  listOutline,
  statsChartOutline,
  cardOutline,
  clipboardOutline,
  helpCircleOutline,
  chatbubblesOutline,
} from 'ionicons/icons';

import { getCurrentUser } from '../../../utils/auth';
import { useLocation } from 'react-router-dom';
import LogoutButton from '../Logout/Logout';

/* Importar el CSS que te pasé */
import './SideMenu.css';

const closeMenu = async () => {
  const menu = document.querySelector("ion-menu") as HTMLIonMenuElement | null;
  if (menu) {
    await menu.close();
  }
};

const SideMenu: React.FC = () => {
  const user = getCurrentUser();
  const location = useLocation();

  const isAdmin = user?.role === 'admin';
  const isDashboard = location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/ordenes') ||
    location.pathname.startsWith('/configuracion') ||
    location.pathname.startsWith('/reports') ||
    location.pathname.startsWith('/graficos') ||
    location.pathname.startsWith('/finanzas') ||
    location.pathname.startsWith('/auditoria') ||
    location.pathname.startsWith('/soporteMensajes') ||
    location.pathname.startsWith('/server');

  return (
    <IonMenu contentId="main-content" type="overlay">
      <IonContent className="custom-menu">
        <IonList>

          {/* Menú ADMIN en Dashboard */}
          {isAdmin && isDashboard ? (
            <>
              <IonItem routerLink="/dashboard" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={peopleOutline} />
                Usuarios
              </IonItem>
              <IonItem routerLink="/graficos" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={statsChartOutline} />
                Gráficos
              </IonItem>
              <IonItem routerLink="/ordenes" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={listOutline} />
                Ordenes
              </IonItem>
              <IonItem routerLink="/finanzas" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={cardOutline} />
                Finanzas
              </IonItem>
              <IonItem routerLink="/reports" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={documentTextOutline} />
                Reportes
              </IonItem>
              <IonItem routerLink="/auditoria" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={clipboardOutline} />
                Auditoria
              </IonItem>
              <IonItem routerLink="/soporteMensajes" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={chatbubblesOutline} />
                Mensajes de soporte
              </IonItem>
              <IonItem routerLink="/configuracion" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={settingsOutline} />
                Configuración
              </IonItem>
              <IonItem routerLink="/server" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={serverOutline} />
                Servidor
              </IonItem>
              <IonItem routerLink="/" routerDirection="none" onClick={closeMenu} className="logout-item">
                <LogoutButton />
              </IonItem>
            </>
          ) : (
            // Menú CLIENTE o Admin en modo cliente
            <>
              <IonItem routerLink="/home" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={homeOutline} />
                Inicio
              </IonItem>
              <IonItem routerLink="/profile" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={personOutline} />
                Perfil
              </IonItem>
              <IonItem routerLink="/products" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={cartOutline} />
                Productos
              </IonItem>
              <IonItem routerLink="/pedidos" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={listOutline} />
                Mis Pedidos
              </IonItem>
              <IonItem routerLink="/home" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={cashOutline} />
                Pago
              </IonItem>
              <IonItem routerLink="/soporte" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={helpCircleOutline} />
                Soporte
              </IonItem>
              <IonItem routerLink="/home" routerDirection="none" onClick={closeMenu}>
                <IonIcon slot="start" icon={informationCircleOutline} />
                About Us
              </IonItem>
              <IonItem routerLink="/" routerDirection="none" onClick={closeMenu} className="logout-item">
                <LogoutButton />
              </IonItem>
            </>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
