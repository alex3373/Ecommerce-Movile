import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput,
  IonItem, IonLabel, IonButton, IonSelect, IonSelectOption,
  IonList
} from '@ionic/react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';
import './Payment.css';

const Payment: React.FC = () => {
  const [product, setProduct] = useState<any>(null);

  // Datos cliente
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');

  // Lógica de precios para futuro escalamiento
  const [precioProveedor, setPrecioProveedor] = useState(0);
  const [precioVenta, setPrecioVenta] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem('productoSeleccionado');
    if (stored) {
      const prod = JSON.parse(stored);
      setProduct(prod);
      const precio = parseFloat(prod.price);
      const sugerido = Math.round(precio * 1.2);
      setPrecioProveedor(precio);
      setPrecioVenta(sugerido);
    }
  }, []);

  const handleEnviarOrden = async () => {
    const user = auth.currentUser;
    if (!user) return alert('Debes iniciar sesión');

    const orden = {
      productoId: product?.id,
      nombreProducto: product?.name,
      precioProveedor,
      precioVenta,
      usuario: user.email || user.displayName || 'desconocido',
      userId: user.uid,
      fecha: Timestamp.fromDate(new Date()), // ← Guardado como Timestamp
      estado: 'En revisión',
      cliente: {
        nombre, apellido, telefono, region, comuna, direccion, correo
      }
    };

    try {
      await addDoc(collection(db, 'order'), orden);
      alert('Orden registrada con éxito');
    } catch (err) {
      console.error(err);
      alert('Error al registrar orden');
    }
  };

  if (!product) {
    return (
      <IonPage>
        <IonContent className="ion-padding">Cargando producto…</IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Resumen de orden</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem><IonLabel position="floating">Nombre</IonLabel><IonInput value={nombre} onIonChange={e => setNombre(e.detail.value!)} /></IonItem>
          <IonItem><IonLabel position="floating">Apellido</IonLabel><IonInput value={apellido} onIonChange={e => setApellido(e.detail.value!)} /></IonItem>
          <IonItem><IonLabel position="floating">Teléfono</IonLabel><IonInput value={telefono} onIonChange={e => setTelefono(e.detail.value!)} /></IonItem>
          <IonItem>
            <IonLabel>Región</IonLabel>
            <IonSelect value={region} onIonChange={e => setRegion(e.detail.value!)} interface="popover">
              <IonSelectOption value="Arica y Parinacota">Arica y Parinacota</IonSelectOption>
              <IonSelectOption value="Tarapacá">Tarapacá</IonSelectOption>
              <IonSelectOption value="Antofagasta">Antofagasta</IonSelectOption>
              <IonSelectOption value="Atacama">Atacama</IonSelectOption>
              <IonSelectOption value="Coquimbo">Coquimbo</IonSelectOption>
              <IonSelectOption value="Valparaíso">Valparaíso</IonSelectOption>
              <IonSelectOption value="Metropolitana de Santiago">Metropolitana de Santiago</IonSelectOption>
              <IonSelectOption value="Libertador General Bernardo O'Higgins">Libertador General Bernardo O'Higgins</IonSelectOption>
              <IonSelectOption value="Maule">Maule</IonSelectOption>
              <IonSelectOption value="Ñuble">Ñuble</IonSelectOption>
              <IonSelectOption value="Biobío">Biobío</IonSelectOption>
              <IonSelectOption value="La Araucanía">La Araucanía</IonSelectOption>
              <IonSelectOption value="Los Ríos">Los Ríos</IonSelectOption>
              <IonSelectOption value="Los Lagos">Los Lagos</IonSelectOption>
              <IonSelectOption value="Aysén del General Carlos Ibáñez del Campo">Aysén</IonSelectOption>
              <IonSelectOption value="Magallanes y de la Antártica Chilena">Magallanes</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem><IonLabel position="floating">Comuna</IonLabel><IonInput value={comuna} onIonChange={e => setComuna(e.detail.value!)} /></IonItem>
          <IonItem><IonLabel position="floating">Dirección</IonLabel><IonInput value={direccion} onIonChange={e => setDireccion(e.detail.value!)} /></IonItem>
          <IonItem><IonLabel position="floating">Correo</IonLabel><IonInput value={correo} onIonChange={e => setCorreo(e.detail.value!)} /></IonItem>
        </IonList>

        <div style={{ marginTop: '2rem', marginBottom: '1rem' }}>
          <h2>{product.name}</h2>
          <p><strong>Precio:</strong> ${precioVenta.toLocaleString()}</p>
        </div>

        <IonButton expand="block" onClick={handleEnviarOrden}>
          Enviar orden
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Payment;
