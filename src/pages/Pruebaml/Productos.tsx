import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonSpinner,
  IonButton,
} from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  fetchWooCategories,
  fetchWooProductsByCategory,
  fetchWooProductsBySearch,
  WooCategory,
  WooProduct,
} from '../../services/apiEcommerce';
import Searchbar from '../../components/searchbarcomponents/Searchbar';

const Productos: React.FC = () => {
  const [categories, setCategories] = useState<WooCategory[]>([]);
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 8;

  const location = useLocation();
  const history = useHistory();

  const queryParams = new URLSearchParams(location.search);
  const categoriaId = queryParams.get('categoria');
  const searchParam = queryParams.get('search');

  useEffect(() => {
    fetchWooCategories()
      .then((fetchedCategories) => {
        const sortedCategories = [...fetchedCategories].sort(
          (a, b) => (b.count || 0) - (a.count || 0)
        );
        setCategories(sortedCategories);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);

    if (searchParam) {
      fetchWooProductsBySearch(searchParam)
        .then(setProducts)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      const id = categoriaId ? Number(categoriaId) : null;
      const fetchProducts = id
        ? fetchWooProductsByCategory(id)
        : fetchWooProductsByCategory(0);
      fetchProducts
        .then(setProducts)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [categoriaId, searchParam]);

  const handleCategoryClick = (id: number) => {
    history.push(`/Productos?categoria=${id}`);
  };

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tienda: Prueba ML</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
         <Searchbar
          onSearch={(query) => {
            if (query.trim()) {
              history.push(`/Productos?search=${encodeURIComponent(query)}`);
            } else {
              history.push('/Productos');
            }
          }}
          initialValue={searchParam || ''}
        />
        <h2 className="text-lg font-bold mb-4">Categorías</h2>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '10px',
          }}
        >
          {currentCategories.map((cat) => (
            <IonButton
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              color={categoriaId == String(cat.id) ? 'tertiary' : 'medium'}
            >
              {cat.name} ({cat.count})
            </IonButton>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '20px',
          }}
        >
          <IonButton
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Anterior
          </IonButton>
          <IonButton
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Siguiente
          </IonButton>
        </div>

        <h2 className="text-lg font-bold mb-4">
          {searchParam
            ? `Resultados de búsqueda: "${searchParam}"`
            : categoriaId
            ? `Productos de: ${
                categories.find((cat) => String(cat.id) === categoriaId)?.name || 'Categoría'
              }`
            : 'Todos los Productos'}
        </h2>

        {loading ? (
          <IonSpinner name="crescent" />
        ) : products.length === 0 ? (
          <p>No hay productos para mostrar.</p>
        ) : (
          products.map((product) => (
            <IonCard key={product.id}>
              <IonImg
                src={
                  product.images[0]?.src ||
                  'https://via.placeholder.com/600x400.png?text=Sin+imagen'
                }
              />
              <IonCardHeader>
                <IonCardTitle>{product.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>
                  <strong>Precio:</strong> ${product.price}
                </p>
                <p>
                  <strong>Stock:</strong> {(product as any).stock_quantity ?? 'N/A'}
                </p>

                <IonButton expand="block" routerLink={`/productos/${product.id}`}>
                  Seleccionar Opciones
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))
        )}
      </IonContent>
    </IonPage>
  );
};


export default Productos;
