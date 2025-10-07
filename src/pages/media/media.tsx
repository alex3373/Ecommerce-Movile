import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonTextarea,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonList,
  IonToast,
  IonIcon,
  IonToggle,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { imageOutline, starOutline, documentTextOutline, colorPaletteOutline, constructOutline } from 'ionicons/icons';
import Header from '../../components/common/Header/Header';
import '../media/media.css';

interface Product {
  id: string;
  nombre: string;
  precio: number;
  destacado: boolean;
}

const Media: React.FC = () => {
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [homeParagraph, setHomeParagraph] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [modoMantenimiento, setModoMantenimiento] = useState(false);
  const [colorPrimario, setColorPrimario] = useState('#3880ff');

  useEffect(() => {
    const dummyProducts: Product[] = [
      { id: 'p1', nombre: 'Producto A', precio: 19990, destacado: true },
      { id: 'p2', nombre: 'Producto B', precio: 29990, destacado: false },
      { id: 'p3', nombre: 'Producto C', precio: 9990, destacado: true },
    ];
    setProducts(dummyProducts);
  }, []);

  const handleBannerUpload = () => {
    console.log('Subiendo nuevo banner a Firebase...');
    setToastMessage('Banner subido correctamente');
  };

  const handleSaveFeaturedProducts = () => {
    const destacados = products.filter((p) => p.destacado);
    console.log('Productos destacados:', destacados);
    setToastMessage('Productos destacados guardados');
  };

  const handleParagraphUpdate = () => {
    console.log('Actualizando párrafo:', homeParagraph);
    setToastMessage('Párrafo actualizado correctamente');
  };

  const toggleProductFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, destacado: !p.destacado } : p))
    );
  };

  const handleGuardarModo = () => {
    console.log('Modo mantenimiento:', modoMantenimiento);
    setToastMessage(`Modo mantenimiento ${modoMantenimiento ? 'activado' : 'desactivado'}`);
  };

  const handleGuardarColor = () => {
    document.documentElement.style.setProperty('--ion-color-primary', colorPrimario);
    setToastMessage('Color actualizado correctamente');
  };

  return (
    <IonPage>
      <Header title="Configuración" />

      <IonContent fullscreen className="ion-padding">
        <div className="mediaContainer">
          {/* Banner */}
          <IonCard className="mediaCard">
            <IonCardHeader>
              <IonCardTitle className="mediaTitle">
                <IonIcon icon={imageOutline} className="mediaIcon" /> Cambiar Banner
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="none">
                <IonLabel position="stacked">Selecciona una imagen</IonLabel>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setBannerFile(e.target.files[0]);
                    }
                  }}
                />
              </IonItem>

              {bannerFile && (
                <div className="mediaPreview">
                  <img
                    src={URL.createObjectURL(bannerFile)}
                    alt="Vista previa"
                    className="previewImage"
                  />
                </div>
              )}

              <div className="mediaCenter">
                <IonButton expand="block" onClick={handleBannerUpload} disabled={!bannerFile}>
                  Subir Banner
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Productos Destacados */}
          <IonCard className="mediaCard">
            <IonCardHeader>
              <IonCardTitle className="mediaTitle">
                <IonIcon icon={starOutline} className="mediaIcon" /> Productos Destacados
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {products.map((product) => (
                  <IonItem key={product.id} lines="none">
                    <IonLabel>
                      {product.nombre} - ${product.precio.toLocaleString()}
                    </IonLabel>
                    <IonCheckbox
                      checked={product.destacado}
                      onIonChange={() => toggleProductFeatured(product.id)}
                    />
                  </IonItem>
                ))}
              </IonList>
              <div className="mediaCenter">
                <IonButton expand="block" onClick={handleSaveFeaturedProducts}>
                  Guardar Productos
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Párrafo Home */}
          <IonCard className="mediaCard">
            <IonCardHeader>
              <IonCardTitle className="mediaTitle">
                <IonIcon icon={documentTextOutline} className="mediaIcon" /> Párrafo Guía del Home
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="none">
                <IonLabel position="stacked">
                  Párrafo ({homeParagraph.length}/200)
                </IonLabel>
                <IonTextarea
                  maxlength={200}
                  rows={4}
                  value={homeParagraph}
                  placeholder="Ej: Bienvenido a la app, aquí puedes encontrar los mejores productos..."
                  onIonChange={(e) => setHomeParagraph(e.detail.value!)}
                />
              </IonItem>
              <div className="mediaCenter">
                <IonButton
                  expand="block"
                  onClick={handleParagraphUpdate}
                  disabled={!homeParagraph}
                >
                  Guardar Párrafo
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Modo mantenimiento */}
          <IonCard className="mediaCard">
            <IonCardHeader>
              <IonCardTitle className="mediaTitle">
                <IonIcon icon={constructOutline} className="mediaIcon" /> Modo Mantenimiento
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="none">
                <IonLabel>Activar modo mantenimiento</IonLabel>
                <IonToggle
                  checked={modoMantenimiento}
                  onIonChange={(e) => setModoMantenimiento(e.detail.checked)}
                />
              </IonItem>
              <div className="mediaCenter">
                <IonButton expand="block" onClick={handleGuardarModo}>
                  Guardar Estado
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Editor de color primario */}
          <IonCard className="mediaCard">
            <IonCardHeader>
              <IonCardTitle className="mediaTitle">
                <IonIcon icon={colorPaletteOutline} className="mediaIcon" /> Color Principal
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines="none">
                <IonLabel position="stacked">Color Primario</IonLabel>
                <input
                  type="color"
                  value={colorPrimario}
                  onChange={(e) => setColorPrimario(e.target.value)}
                />
              </IonItem>
              <div className="mediaCenter">
                <IonButton expand="block" onClick={handleGuardarColor}>
                  Aplicar Color
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={!!toastMessage}
          message={toastMessage}
          color="success"
          duration={2000}
          position="top"
          onDidDismiss={() => setToastMessage('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default Media;