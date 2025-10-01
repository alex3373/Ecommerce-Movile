import React, { useEffect, useState } from 'react';
import { IonText, IonButton, IonCard, IonCardContent, IonImg, IonSpinner } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { WooProduct, fetchWooProductsBySearch } from '../../../services/apiEcommerce';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

useEffect(() => {
  fetchWooProductsBySearch('')
    .then((fetchedProducts) => {
      const filtered = fetchedProducts.filter(
        (p) => p.name.trim().toLowerCase() !== 'nuevo producto'
      );

      const shuffled = filtered.sort(() => 0.5 - Math.random());
      setProducts(shuffled.slice(0, 3));
    })
    .catch(console.error)
    .finally(() => setLoading(false));
}, []);

  return (
    <section style={{ padding: 16, backgroundColor: 'transparent' }}>
      <IonText color="primary">
        <h2
          className="ion-padding-start ion-padding-bottom ion-text-uppercase"
          style={{ fontWeight: 700, fontSize: '1.4rem' }}
        >
          Productos Destacados
        </h2>
      </IonText>

      {loading ? (
        <IonSpinner name="crescent" />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
            gap: 16,
          }}
        >
          {products.map((product) => (
            <IonCard
              key={product.id}
              button
              onClick={() => history.push(`/products/${product.id}`)}
              style={{
                borderRadius: 12,
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              <IonImg
                src={
                  product.images[0]?.src ||
                  'https://via.placeholder.com/600x400.png?text=Sin+imagen'
                }
                alt={product.name}
                style={{ aspectRatio: '1 / 1', objectFit: 'cover' }}
              />

              <IonCardContent className="ion-text-center">
                <IonText color="dark">
                  <h3 style={{ marginBottom: 4, fontSize: '1rem', fontWeight: 600 }}>
                    {product.name}
                  </h3>
                </IonText>

                <IonText color="primary">
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>
                    ${Number(product.price).toLocaleString()}
                  </p>
                </IonText>

                <IonButton
                  size="small"
                  color="danger"
                  fill="solid"
                  expand="block"
                  style={{ marginTop: 8 }}
                >
                  Ver más
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;





