import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonImg,
  IonCard,
  IonCardContent,
  IonSelect,
  IonSelectOption,
  IonButton,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { fetchWooProductById } from '../../services/apiOfertasimperdibles';

// Función para descargar imagen
const descargarImagen = (url: string, nombre: string) => {
  if (!url) return alert('Imagen no disponible');
  const link = document.createElement('a');
  link.href = url;
  link.download = `${nombre.replace(/\s+/g, '_')}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Función para descargar descripción construida desde los atributos
const descargarDescripcion = (nombre: string, attributes: any[]) => {
  const contenido = `
    <html><body>
      <h1>${nombre}</h1>
      <ul>
        ${attributes.map(attr => `
          <li><strong>${attr.name}:</strong> ${attr.options.join(', ')}</li>
        `).join('')}
      </ul>
    </body></html>
  `;
  const blob = new Blob([contenido], { type: 'text/html;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${nombre.replace(/\s+/g, '_')}_atributos.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ProductoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetchWooProductById(Number(id))
      .then(setProduct)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSeleccionar = () => {
    localStorage.setItem('productoSeleccionado', JSON.stringify(product));
    history.push('/payment');
  };

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Producto</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonSpinner name="crescent" />
        </IonContent>
      </IonPage>
    );
  }

  if (!product) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Producto</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>No se encontró el producto.</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{product.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonImg src={product.images?.[0]?.src} />
        <IonCard>
          <IonCardContent>
            <p><strong>Precio:</strong> ${product.price}</p>

            {/* Opciones de atributos (selector interactivo) */}
            {product.attributes?.map((attr: any) => (
              <div key={attr.id}>
                <IonSelect placeholder={`Elige ${attr.name}`}>
                  {attr.options?.map((option: any, idx: number) => (
                    <IonSelectOption key={idx} value={option}>
                      {option}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </div>
            ))}

            <IonButton expand="block" onClick={handleSeleccionar}>
              Seleccionar
            </IonButton>

            <IonButton
              expand="block"
              color="medium"
              onClick={() => descargarImagen(product.images?.[0]?.src, product.name)}
            >
              Descargar imagen
            </IonButton>

            <IonButton
              expand="block"
              color="medium"
              onClick={() => descargarDescripcion(product.name, product.attributes)}
            >
              Descargar detalles
            </IonButton>

            {/* Mostrar atributos en lugar de descripción */}
            <div style={{ marginTop: '1rem' }}>
              <h3>Detalles del producto</h3>
              <ul>
                {product.attributes?.map((attr: any) => (
                  <li key={attr.id}>
                    <strong>{attr.name}:</strong> {attr.options.join(', ')}
                  </li>
                ))}
              </ul>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProductoDetalle;


