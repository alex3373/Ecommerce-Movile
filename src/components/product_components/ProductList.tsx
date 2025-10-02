import React, { useEffect, useState, useCallback } from 'react';
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonSpinner,
  IonText,
} from '@ionic/react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  fetchWooCategories,
  fetchWooProductsByCategory,
  fetchWooProductsBySearch,
  WooCategory,
  WooProduct,
} from '../../services/apiEcommerce';
import ProductCard from './ProductCard';
import Searchbar from '../../components/searchbarcomponents/Searchbar';
import Header from '../Header/Header';
import './ProductList.css';

const productsPerPage = 30;
const categoriesPerPage = 3;

const ProductList: React.FC = () => {
  const [categories, setCategories] = useState<WooCategory[]>([]);
  const [products, setProducts] = useState<WooProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [currentProductPage, setCurrentProductPage] = useState(1);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  const [currentCategoryPage, setCurrentCategoryPage] = useState(1);

  const location = useLocation();
  const history = useHistory();

  const queryParams = new URLSearchParams(location.search);
  const categoriaId = queryParams.get('categoria');
  const searchParam = queryParams.get('search') || '';

  // 🔹 Cargar categorías al inicio
  useEffect(() => {
    fetchWooCategories()
      .then((fetchedCategories) => {
        const sorted = [...fetchedCategories].sort(
          (a, b) => (b.count || 0) - (a.count || 0)
        );
        setCategories(sorted);
      })
      .catch(console.error);
  }, []);

  // 🔹 Mostrar productos según búsqueda o categoría
  useEffect(() => {
    setProducts([]);
    setCurrentProductPage(1);
    setHasMoreProducts(true);
    loadProducts(true, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoriaId, searchParam]);

  // 🔹 Mostrar 30 productos aleatorios si no hay búsqueda ni categoría
  useEffect(() => {
    if (!searchParam && !categoriaId) {
      setLoadingProducts(true);
      fetchWooProductsBySearch('')
        .then((fetchedProducts) => {
          const shuffled = fetchedProducts.sort(() => 0.5 - Math.random());
          const random30 = shuffled.slice(0, 30);
          setProducts(random30);
          setHasMoreProducts(false);
        })
        .catch(console.error)
        .finally(() => setLoadingProducts(false));
    }
  }, []); // Solo al inicio

  // 🔹 Cargar productos con paginación
  const loadProducts = useCallback(
    async (reset = false, pageOverride?: number) => {
      if (loadingProducts || (!searchParam && !categoriaId)) return;

      setLoadingProducts(true);
      const page = reset ? 1 : pageOverride ?? currentProductPage;

      try {
        let data: WooProduct[] = [];

        if (searchParam) {
          data = await fetchWooProductsBySearch(searchParam, page, productsPerPage);
        } else {
          const id = categoriaId ? Number(categoriaId) : 0;
          data = await fetchWooProductsByCategory(id, page, productsPerPage);
        }

        if (reset) {
          setProducts(data);
          setCurrentProductPage(2);
          setHasMoreProducts(data.length === productsPerPage);
        } else {
          setProducts((prev) => [...prev, ...data]);
          setCurrentProductPage((prev) => prev + 1);
          if (data.length < productsPerPage) setHasMoreProducts(false);
        }
      } catch (error) {
        console.error('Error cargando productos:', error);
        setHasMoreProducts(false);
      } finally {
        setLoadingProducts(false);
      }
    },
    [searchParam, categoriaId, currentProductPage, loadingProducts]
  );

  const handleCategoryClick = (id: number) => {
    history.push(`/ProductList?categoria=${id}`);
  };

  const indexOfLastCategory = currentCategoryPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalCategoryPages = Math.ceil(categories.length / categoriesPerPage);

  return (
    <IonPage>
      <Header title="Catálogo" />
      <IonContent fullscreen className="product-list-content ion-padding">
        {/* 🔍 Barra de búsqueda */}
        <Searchbar
          onSearch={(query) => {
            if (query.trim()) {
              history.push(`/ProductList?search=${encodeURIComponent(query)}`);
            } else {
              history.push('/ProductList');
            }
          }}
          initialValue={searchParam}
        />

        {/* 🗂 Categorías */}
        <h2 className="text-lg font-bold mb-4">Categorías</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
          {currentCategories.map((cat) => (
           <IonButton
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            color={categoriaId === String(cat.id) ? 'tertiary' : 'primary'}
          >
            {cat.name} ({cat.count})
          </IonButton>
          ))}
        </div>

        {/* 🔄 Paginación de categorías */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
          <IonButton
            color="primary"
            disabled={currentCategoryPage === 1}
            onClick={() => setCurrentCategoryPage(p => p - 1)}
          >
            Anterior
          </IonButton>
          <IonButton
            color="primary"
            disabled={currentCategoryPage === totalCategoryPages}
            onClick={() => setCurrentCategoryPage(p => p + 1)}
          >
            Siguiente
          </IonButton>
        </div>


        {/* 🛒 Productos */}
        <h2 className="text-lg font-bold mb-4">
          {searchParam
            ? `Resultados de búsqueda: "${searchParam}"`
            : categoriaId
              ? `Productos de: ${
                categories.find((cat) => String(cat.id) === categoriaId)?.name || 'Categoría'
              }`
              : 'Últimos Productos'}
        </h2>

        {products.length === 0 && !loadingProducts ? (
          <IonText>No hay productos para mostrar.</IonText>
        ) : (
          <>
            <IonGrid className="product-grid">
              <IonRow>
                {products.map((product) => (
                  <IonCol size="6" size-md="4" size-lg="3" key={product.id}>
                    <ProductCard
                      product={{
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image:
                          product.images[0]?.src ||
                          'https://via.placeholder.com/600x400.png?text=Sin+imagen',
                      }}
                    />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>

            {/* 🔘 Botón Cargar más */}
            {hasMoreProducts && !loadingProducts && (
              <IonButton expand="block" onClick={() => loadProducts(false)}>
                Cargar más
              </IonButton>
            )}

            {/* 🔄 Spinner */}
            {loadingProducts && <IonSpinner name="crescent" />}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProductList;
