import {
  IonCard,
  IonCardContent,
  IonChip,
  IonLabel,
  IonText,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { cartOutline, star } from "ionicons/icons";
import React from "react";
import "./ProductInfo.css";
import { WooProduct } from "../../services/apiEcommerce";
import { addToCart } from "../../services/cartService";

interface Props {
  product: WooProduct;
}

const ProductInfo: React.FC<Props> = ({ product }) => {
  const handleAddToCart = async () => {
    await addToCart(product);
    alert("Producto añadido al carrito");
  };

  const handleBuyNow = () => {
    localStorage.setItem("productoSeleccionado", JSON.stringify(product));
    window.location.href = "/payment";
  };

  return (
    <IonCard className="product-detail-info-card">
      <IonCardContent>
        <IonChip className="product-detail-chip">
          <IonLabel>{product.categories?.[0]?.name || "Sin categoría"}</IonLabel>
        </IonChip>

        <IonText>
          <h1 className="product-detail-title">{product.name}</h1>
        </IonText>

        <div className="product-detail-rating">
          <IonIcon icon={star} className="rating-star" />
          <IonText className="rating-value">{product.average_rating || "0"}</IonText>
          <IonText className="rating-reviews">({product.rating_count || 0})</IonText>
        </div>

        <IonText>
          <h2 className="product-detail-price">
            ${Number(product.price).toLocaleString()}
          </h2>
        </IonText>

        <div
          className="product-detail-description"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />

        <div className="product-detail-actions">
          <IonButton
            expand="block"
            color="primary"
            className="product-detail-cart-btn"
            onClick={handleAddToCart}
          >
            <IonIcon icon={cartOutline} slot="start" />
            Añadir al carrito
          </IonButton>

          <IonButton
            expand="block"
            color="primary"
            className="product-detail-cart-btn"
            onClick={handleBuyNow}
          >
            <IonIcon icon={cartOutline} slot="start" />
            Comprar ahora
          </IonButton>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ProductInfo;
