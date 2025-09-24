import React from 'react';
import { IonCard, IonCardContent, IonImg, IonText, IonButton, IonIcon } from '@ionic/react';
import { cartOutline, heartOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number | string;
  image: string;
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/products/${product.id}`);
  };

  return (
    <IonCard className="product-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="product-image-container">
        <IonImg src={product.image} className="product-image" />
        <IonButton fill="clear" className="favorite-button">
          <IonIcon slot="icon-only" icon={heartOutline} />
        </IonButton>
      </div>
      <div className="product-card-info">
        <IonText>
          <h3 className="product-name">{product.name}</h3>
        </IonText>
        <div className="product-price-row">
          <IonText color="dark">
            <p className="product-price">
              ${typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
            </p>
          </IonText>
          <IonButton className="add-to-cart-button" size="small">
            <IonIcon slot="icon-only" icon={cartOutline} />
          </IonButton>
        </div>
      </div>
    </IonCard>
  );
};

export default ProductCard;