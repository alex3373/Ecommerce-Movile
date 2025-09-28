import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonText,
} from '@ionic/react';
import { optionsOutline } from 'ionicons/icons';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/product_components/ProductCard';
import { fetchWooProducts } from '../../services/apiEcommerce';
import './ProductList.css';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchWooProducts();
        // Mapea para asegurar que cada producto tenga un campo 'image'
        const mapped = data.map((item: any) => ({
          ...item,
          image: item.image?.src || (item.images && item.images[0]?.src) || "/assets/no-image.png"
        }));
        setProducts(mapped);
      } catch (err) {}
      setLoading(false);
    };
    getProducts();
  }, []);

  return (
    <IonPage>
      <Header title="Catálogo" />
      <IonContent fullscreen className="product-list-content">
        <div className="sticky-search-header">
          <IonSearchbar
            className="product-searchbar"
            placeholder="Buscar..."
            debounce={500}
          ></IonSearchbar>
          <IonButton fill="clear" className="filter-button">
            <IonIcon slot="icon-only" icon={optionsOutline} />
          </IonButton>
        </div>

        <IonGrid className="product-grid">
          <IonRow>
            {loading ? (
              <IonCol size="12">
                <IonText>Cargando productos...</IonText>
              </IonCol>
            ) : (
              products.map((item) => (
                <IonCol size="6" size-md="4" size-lg="3" key={item.id}>
                  <ProductCard product={item} />
                </IonCol>
              ))
            )}
          </IonRow>
        </IonGrid>
      </IonContent>
      <Footer />
    </IonPage>
  );
};

export default ProductList;