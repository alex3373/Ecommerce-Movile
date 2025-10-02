import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonImg,
  IonText,
  IonButton,
  IonSpinner,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { WooProduct, fetchWooProductsBySearch } from '../../../services/apiEcommerce';

interface Offer extends WooProduct {
  offerEndsAt: Date;
}

interface DailyOffersProps {
  onClickProduct?: () => void; // <-- este es opcional
}


const DailyOffers: React.FC<DailyOffersProps> = ({ onClickProduct }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [timeLefts, setTimeLefts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

useEffect(() => {
  fetchWooProductsBySearch('')
    .then((products) => {
      const filteredProducts = products.filter(
        (p) => p.name.trim().toLowerCase() !== 'nuevo producto'
      );

      const categoryMap: { [categoryId: number]: Offer } = {};
      const shuffled = filteredProducts.sort(() => 0.5 - Math.random());

      for (const product of shuffled) {
        const mainCategory = product.categories?.[0];
        if (mainCategory && !categoryMap[mainCategory.id]) {
          categoryMap[mainCategory.id] = {
            ...product,
            offerEndsAt: new Date(
              Date.now() + Math.random() * 2 * 60 * 60 * 1000 + 30 * 60 * 1000
            ),
          };
        }
      }

      const selectedOffers = Object.values(categoryMap).slice(0, 3);
      setOffers(selectedOffers);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
}, []);



  useEffect(() => {
    const updateTimers = () => {
      const updated = offers.map((offer) => {
        const diff = offer.offerEndsAt.getTime() - Date.now();
        if (diff <= 0) return '00:00:00';
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      });
      setTimeLefts(updated);
    };

    if (offers.length > 0) {
      updateTimers();
      const interval = setInterval(updateTimers, 1000);
      return () => clearInterval(interval);
    }
  }, [offers]);

  return (
    <section style={{ padding: 16 }}>
      <IonText color="danger" class="ion-text-center">
  <h2
    className="ion-padding-bottom"
    style={{ fontWeight: 700, fontSize: "1.4rem" }}
  >
    🔥 Ofertas Del Día
  </h2>
</IonText>
      {loading ? (
        <IonSpinner name="crescent" />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
          }}
        >
          {offers.map((offer, index) => (
            <IonCard
              key={offer.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 12,
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                minHeight: 370,
              }}
            >
              <IonImg
                src={
                  offer.images[0]?.src ||
                  'https://via.placeholder.com/200?text=Imagen+no+disponible'
                }
                alt={offer.name}
                style={{
                  width: '100%',
                  height: 160,
                  objectFit: 'cover',
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />

              <IonCardContent
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  justifyContent: 'space-between',
                  padding: '12px 12px 16px',
                  textAlign: 'center',
                }}
              >
                <div>
                  <IonText color="dark">
                    <h3 style={{ marginBottom: 4, fontSize: '1rem', fontWeight: 600 }}>
                      {offer.name}
                    </h3>
                  </IonText>

                  <IonText color="danger">
                    <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>
                      ${Number(offer.price).toLocaleString()}
                    </p>
                  </IonText>

                  <IonText color="medium">
                    <p style={{ margin: '4px 0', fontSize: '0.8rem' }}>
                      Termina en: <strong>{timeLefts[index]}</strong>
                    </p>
                  </IonText>
                </div>

                <IonButton
                  size="small"
                  color="danger"
                  fill="solid"
                  expand="block"
                  style={{ marginTop: 'auto' }}
                  onClick={() => {
                    if (onClickProduct) {
                      onClickProduct(); // ← redirige al login si es invitado
                    } else {
                      history.push(`/products/${offer.id}`); // ← flujo normal
                    }
                  }}
                >
                  ¡Aprovechar!
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))}
        </div>
      )}
    </section>
  );
};

export default DailyOffers;