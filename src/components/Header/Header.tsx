import React, { useState, useEffect } from 'react';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonImg,
    IonIcon
} from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Header.css';
import NotificationButton from '../common/NotificationButton';
import { auth } from '../../services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const [user, setUser] = useState<User | null>(null);
    const [showPopover, setShowPopover] = useState(false);
    const [event, setEvent] = useState<MouseEvent | undefined>(undefined);
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, []);

    const openPopover = (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
        e.persist();
        setEvent(e.nativeEvent);
        setShowPopover(true);
    };

    return (
        <IonHeader>
            <IonToolbar className="custom-header">
                {/* Botón de menú hamburguesa a la izquierda */}
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>

                {/* Título centrado con logo */}
                <div className="title-with-logo">
                    <IonTitle>{title}</IonTitle>
                    <IonImg 
                        src="./assets/logo_ecommerce.png" 
                        className="header-logo"
                        alt="Logo"
                    />
                </div>
                
                <IonButtons slot="end">
                    <NotificationButton />

                    {/* Botón de carrito solo si hay usuario logueado */}
                    {user && (
                        <IonButton onClick={() => history.push("/cart")}>
                            <IonIcon icon={cartOutline} />
                        </IonButton>
                    )}
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;
