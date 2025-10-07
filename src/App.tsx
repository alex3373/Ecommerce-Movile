import React, { useEffect, useState } from 'react';
import { Route, Redirect } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Mantenimiento */
import { getDoc, doc } from 'firebase/firestore';
import { db } from './services/firebase';
import Mantenimiento from './components/Mantenimiento/Mantenimiento';

/* Componentes */
import SideMenu from './components/common/SideMenu/SideMenu';
import PrivateRoute from "./components/PrivateRoute";

/* Páginas */
import Home from "./pages/Home";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";
import ProductList from "./components/product_components/ProductList";
import ProductDetail from "./components/product_components/ProductDetail";
import Pedidos from "./pages/pedidos/Pedidos";
import UserProfile from "./pages/profile/UserProfile";
import EditProfile from "./pages/profile/EditProfile";
import Payment from './pages/payment/payment';
import Dashboard from './pages/dashboard/dashboard';
import Server from './pages/server/server';
import Reports from './pages/reports/reports';
import Media from './pages/media/media';
import Ordenes from './pages/ordenes/Ordenes';
import Graficos from './pages/graficos/graficos';
import Finanzas from './pages/finanzas/finanzas';
import Auditoria from './pages/auditoria/auditoria';
import Soporte from './pages/Soporte/soporte';
import MensajesSoporte from './pages/mensajesSoporte/mensajesSoporte';
import NotificationsPage from "./pages/notifications/NoticationsPage";
import NotificationDetailPage from "./pages/notifications/NotificationDetailPage";
import Selector from './pages/Selector';
import GuestHome from './pages/GuestHome';

/* Contexto */
import { NotificationProvider } from './context/NotificationContext';

/* CSS */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";
import "./App.css";
import 'leaflet/dist/leaflet.css';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import Cart from "./components/cart/Cart";
setupIonicReact();

if (Capacitor.getPlatform() === 'android') {
  StatusBar.setOverlaysWebView({ overlay: false });
  StatusBar.setBackgroundColor({ color: 'transparent' });
}

const AppContent: React.FC = () => {
  const [isMaintenance, setIsMaintenance] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const configDoc = await getDoc(doc(db, 'config', 'general'));
        if (configDoc.exists()) {
          const data = configDoc.data();
          setIsMaintenance(data.isMaintenance || false);
        } else {
          setIsMaintenance(false);
        }
      } catch (error) {
        console.error('Error cargando config:', error);
        setIsMaintenance(false);
      }
    };

    fetchMaintenance();
  }, []);

  if (isMaintenance) {
    return <Mantenimiento />;
  }

  return (
    <IonRouterOutlet id="main-content">
      <Route exact path="/" component={GuestHome} />
      <PrivateRoute exact path="/home" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/ProductList" component={ProductList} />
      <Route exact path="/products" component={ProductList} />
      <PrivateRoute exact path="/products/:id" component={ProductDetail} />
      <PrivateRoute exact path="/productos" component={ProductList} />
      <PrivateRoute exact path="/profile" component={UserProfile} />
      <PrivateRoute exact path="/edit-profile" component={EditProfile} />
      <PrivateRoute exact path="/pedidos" component={Pedidos} />
      <PrivateRoute exact path="/soporte" component={Soporte} />
      <PrivateRoute exact path="/payment" component={Payment} />

      {/* NUEVA RUTA DEL CARRITO */}
      <Route exact path="/cart" component={Cart} />

      {/* Admin Pages */}
      <PrivateRoute exact path="/dashboard" allowedRole="admin" component={Dashboard} />
      <PrivateRoute exact path="/ordenes" allowedRole="admin" component={Ordenes} />
      <PrivateRoute exact path="/server" allowedRole="admin" component={Server} />
      <PrivateRoute exact path="/reports" allowedRole="admin" component={Reports} />
      <PrivateRoute exact path="/configuracion" allowedRole="admin" component={Media} />
      <PrivateRoute exact path="/selector" allowedRole="admin" component={Selector} />
      <PrivateRoute exact path="/graficos" allowedRole="admin" component={Graficos} />
      <PrivateRoute exact path="/finanzas" allowedRole="admin" component={Finanzas} />
      <PrivateRoute exact path="/auditoria" allowedRole="admin" component={Auditoria} />
      <PrivateRoute exact path="/soporteMensajes" allowedRole="admin" component={MensajesSoporte} />

      {/* Notifications */}
      <PrivateRoute exact path="/notifications" component={NotificationsPage} />
      <PrivateRoute exact path="/notifications/:id" component={NotificationDetailPage} />

      {/* Fallback */}
      <Redirect to="/" />
    </IonRouterOutlet>
  );
};

const App: React.FC = () => (
  <NotificationProvider>
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main-content">
          <SideMenu />
          <AppContent />
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  </NotificationProvider>
);

export default App;
