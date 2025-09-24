import React from 'react';
import { IonSearchbar } from '@ionic/react';

interface Props {
    onFilter: (query: string) => void;
}

const OrderFilter: React.FC<Props> = ({ onFilter }) => {
    return (
        <IonSearchbar
            placeholder="Buscar por cliente, email o estado..."
            onIonInput={(e) => onFilter(e.detail.value!)}
        />
    );
};

export default OrderFilter;