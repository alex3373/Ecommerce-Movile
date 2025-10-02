import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon } from "@ionic/react";
import { getCart, removeFromCart, clearCart } from "../../services/cartService";
import { trashOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const Cart: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id: number) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      return alert("El carrito está vacío");
    }

    // Guardamos todo el carrito en localStorage
    localStorage.setItem("productoSeleccionado", JSON.stringify(cart));

    // Redirigimos a Payment
    history.push("/payment");

    // Opcional: limpiar carrito
    clearCart();
    setCart([]);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>🛒 Mi Carrito</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <>
            <IonList>
              {cart.map((product) => (
                <IonItem key={product.id}>
                  <IonLabel>
                    {product.name} - ${product.price}
                  </IonLabel>
                  <IonButton color="danger" fill="clear" onClick={() => handleRemove(product.id)}>
                    <IonIcon icon={trashOutline} />
                  </IonButton>
                </IonItem>
              ))}
            </IonList>
            <IonButton expand="block" color="primary" onClick={handleCheckout}>
              Realizar Pedido
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Cart;
