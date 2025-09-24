import React, { useState } from 'react';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonPopover,
    IonList,
    IonItem,
    IonImg
} from '@ionic/react';
import './Header.css';
import NotificationButton from './common/NotificationButton';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const [showPopover, setShowPopover] = useState(false);
    const [event, setEvent] = useState<MouseEvent | undefined>(undefined);

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
                        src="./assets/logo_crazy_family_v2.png" 
                        className="header-logo"
                        alt="Crazy Family Logo"
                    />
                </div>
                
                <IonButtons slot="end">
                    <NotificationButton />
                </IonButtons>

            </IonToolbar>
        </IonHeader>
    );
};

export default Header;