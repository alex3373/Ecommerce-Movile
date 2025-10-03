import React, { useEffect, useState } from 'react';
import {
  IonPage, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonSelect, IonSelectOption
} from '@ionic/react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../services/firebase';
import Header from '../../components/Header/Header'; // Ajusta según tu ruta
import './Payment.css';

const Payment: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);

  // Datos cliente
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('productoSeleccionado');
    if (stored) {
      const productos = JSON.parse(stored); // ahora puede ser un array
      setCart(productos);
    }
  }, []);

  const handleEnviarOrden = async () => {
    const user = auth.currentUser;
    if (!user) return alert('Debes iniciar sesión');

    try {
      for (const product of cart) {
        await addDoc(collection(db, 'order'), {
          productoId: product.id,
          nombreProducto: product.name,
          precioProveedor: parseFloat(product.price),
          precioVenta: Math.round(parseFloat(product.price) * 1.2),
          usuario: user.email || user.displayName || 'desconocido',
          userId: user.uid,
          fecha: Timestamp.fromDate(new Date()),
          estado: 'En revisión',
          cliente: { nombre, apellido, telefono, region, comuna, direccion, correo }
        });
      }
      alert('Orden registrada con éxito');
      localStorage.removeItem('productoSeleccionado');
      setCart([]);
    } catch (err) {
      console.error(err);
      alert('Error al registrar orden');
    }
  };

  if (cart.length === 0) {
    return (
      <IonPage>
        <Header title="Resumen de orden" />
        <IonContent className="ion-padding">No hay productos en el carrito…</IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage className="payment-page">
      <Header title="Resumen de orden" />
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="floating">Nombre</IonLabel>
            <IonInput value={nombre} onIonChange={e => setNombre(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Apellido</IonLabel>
            <IonInput value={apellido} onIonChange={e => setApellido(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Teléfono</IonLabel>
            <IonInput value={telefono} onIonChange={e => setTelefono(e.detail.value!)} />
          </IonItem>
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
              <IonSelectOption value="Aysén">Aysén</IonSelectOption>
              <IonSelectOption value="Magallanes">Magallanes</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Comuna</IonLabel>
            <IonInput value={comuna} onIonChange={e => setComuna(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Dirección</IonLabel>
            <IonInput value={direccion} onIonChange={e => setDireccion(e.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Correo</IonLabel>
            <IonInput value={correo} onIonChange={e => setCorreo(e.detail.value!)} />
          </IonItem>
        </IonList>

        <div className="payment-cart">
          <h2 className="payment-cart-header">Productos en el carrito</h2>
          {cart.map((prod, index) => (
            <div key={index} className="payment-cart-item">
              <span>{prod.name}</span>
              <span>${parseFloat(prod.price).toLocaleString()}</span>
            </div>
          ))}
          <p className="payment-total">
            Total: ${cart.reduce((sum, p) => sum + parseFloat(p.price), 0).toLocaleString()}
          </p>
        </div>

        <IonButton expand="block" onClick={handleEnviarOrden}>
          Enviar orden
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Payment;
