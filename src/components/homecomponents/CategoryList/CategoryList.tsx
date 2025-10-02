import React, { useEffect, useState } from 'react';
import {
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonButton,
  IonSpinner,
  IonImg,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import {
  fetchWooCategories,
  fetchWooProductsByCategory,
  WooCategory,
} from '../../../services/apiEcommerce';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<WooCategory[]>([]);
  const [images, setImages] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetchWooCategories()
      .then(async (fetchedCategories) => {
        const sorted = [...fetchedCategories]
          .filter((cat) => cat.count && cat.count > 0)
          .sort((a, b) => (b.count || 0) - (a.count || 0));

        // Mostrar las 4 categorías con más productos
        const topCategories = sorted.slice(0, 4);
        setCategories(topCategories);

        const imagesMap: Record<number, string> = {};

        await Promise.all(
          topCategories.map(async (cat) => {
            try {
              const products = await fetchWooProductsByCategory(cat.id);
              const shuffled = products.sort(() => 0.5 - Math.random());
              const image =
                shuffled[0]?.images[0]?.src ||
                'https://via.placeholder.com/300x300.png?text=Sin+imagen';
              imagesMap[cat.id] = image;
            } catch {
              imagesMap[cat.id] = 'https://via.placeholder.com/300x300.png?text=Sin+imagen';
            }
          })
        );

        setImages(imagesMap);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryClick = (id: number) => {
    history.push(`/Productos?categoria=${id}`);
  };

  return (
    <section style={{ padding: 16 }}>
      <IonText color="primary" class="ion-text-center">
      <h2 style={{ fontWeight: 600, marginBottom: 16 }}>
      Categorias Destacadas 
      </h2>
    </IonText>
          {loading ? (
        <IonSpinner name="crescent" />
      ) : (
        <IonGrid>
          <IonRow>
            {categories.map((category) => (
              <IonCol
                size="6"
                sizeSm="4"
                sizeMd="3"
                key={category.id}
                style={{ cursor: 'pointer' }}
              >
                <IonCard
                  onClick={() => handleCategoryClick(category.id)}
                  style={{
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <IonImg
                    src={images[category.id]}
                    alt={category.name}
                    style={{
                      width: '100%',
                      height: 120,
                      objectFit: 'cover',
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  />
                  <IonCardContent
                    style={{
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      color: 'black',
                    }}
                  >
                    {category.name} ({category.count})
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>

          <IonRow class="ion-justify-content-center" style={{ marginTop: 16 }}>
            <IonCol size="12" class="ion-text-center">
              <IonButton fill="clear" color="primary" onClick={() => history.push('/Productos')}>
                Ver todos los productos →
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      )}
    </section>
  );
};

export default CategoryList;

