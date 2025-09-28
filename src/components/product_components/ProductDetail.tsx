import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonText, IonButton, IonSpinner } from "@ionic/react";
import ProductDetailHeader from "./ProductDetailHeader";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import "./ProductDetail.css";
import { fetchWooProductById, WooProduct } from "../../services/apiEcommerce"; 

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [product, setProduct] = useState<WooProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const prod = await fetchWooProductById(Number(id));
        setProduct(prod);
      } catch (err) {
        console.error("Error al cargar producto:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <IonPage>
        <ProductDetailHeader title="Cargando..." onBack={history.goBack} />
        <IonContent className="ion-padding">
          <IonSpinner name="dots" />
        </IonContent>
      </IonPage>
    );
  }

  if (error || !product) {
    return (
      <IonPage>
        <ProductDetailHeader title="Producto no encontrado" onBack={history.goBack} />
        <IonContent className="ion-padding">
          <IonText color="danger"><h2>No encontrado</h2></IonText>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <ProductDetailHeader title={product.name} onBack={history.goBack} />
      <IonContent fullscreen className="product-detail-bg">
        <div className="product-detail-container">
          <IonGrid className="product-detail-grid">
            <IonRow>
              <IonCol size="12" sizeMd="6">
                <ProductImage src={product.images?.[0]?.src} alt={product.name} />
              </IonCol>
              <IonCol size="12" sizeMd="6">
                <ProductInfo
                  product={product}
                  isFav={isFav}
                  onToggleFav={() => setIsFav((prev) => !prev)}
                />
                <IonButton
                  expand="block"
                  color="secondary"
                  onClick={() => history.push(`/contact-seller/${product.id}`)}
                >
                  Contactar al vendedor
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductDetail;