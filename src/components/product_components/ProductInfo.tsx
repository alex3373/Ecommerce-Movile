import {
  IonCard,
  IonCardContent,
  IonChip,
  IonLabel,
  IonText,
  IonIcon,
  IonButton
} from "@ionic/react";
import { cartOutline, heartOutline, heart, star } from "ionicons/icons";
import React from "react";
import "./ProductInfo.css";
import { WooProduct } from "../../services/apiOfertasimperdibles";

interface Props {
  product: WooProduct;
  isFav: boolean;
  onToggleFav: () => void;
}

const ProductInfo: React.FC<Props> = ({ product, isFav, onToggleFav }) => (
  <IonCard className="product-detail-info-card">
    <IonCardContent>
      <IonChip className="product-detail-chip">
        <IonLabel>{product.categories?.[0]?.name || 'Sin categoría'}</IonLabel>
      </IonChip>

      <IonText>
        <h1 className="product-detail-title">{product.name}</h1>
      </IonText>

      <div className="product-detail-rating">
        <IonIcon icon={star} className="rating-star" />
        <IonText className="rating-value">{product.average_rating || '0'}</IonText>
        <IonText className="rating-reviews">({product.rating_count || 0})</IonText>
      </div>

      <IonText>
        <h2 className="product-detail-price">${Number(product.price).toLocaleString()}</h2>
      </IonText>

      <div
        className="product-detail-description"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />

      <div className="product-detail-actions">
        <IonButton expand="block" className="product-detail-cart-btn">
          <IonIcon icon={cartOutline} slot="start" />
          Añadir al carrito
        </IonButton>

        <IonButton
          expand="block"
          className="product-detail-cart-btn"
          color="primary"
          onClick={() => {
            localStorage.setItem('productoSeleccionado', JSON.stringify(product));
            window.location.href = '/payment';
          }}
        >
          <IonIcon icon={cartOutline} slot="start" />
          Comprar ahora
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          className={`product-detail-fav-btn-alt${isFav ? " fav-active" : ""}`}
          onClick={onToggleFav}
        >
          <IonIcon icon={isFav ? heart : heartOutline} slot="start" />
          {isFav ? "Favorito" : "Añadir a favoritos"}
        </IonButton>
      </div>
    </IonCardContent>
  </IonCard>
);

export default ProductInfo;
