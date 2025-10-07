import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { getCart, removeFromCart, clearCart } from "../../services/cartService";
import { trashOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import Header from "../Header/Header";

const Cart: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    const loadCart = async () => {
      const items = await getCart();
      setCart(items);
      console.log("Carrito cargado:", items);
    };
    loadCart();
  }, []);

  const handleRemove = async (id: number) => {
    await removeFromCart(id);
    const updated = await getCart();
    setCart(updated);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      return alert("El carrito está vacío");
    }

    localStorage.setItem("productoSeleccionado", JSON.stringify(cart));
    history.push("/payment");

    await clearCart();
    setCart([]);
  };

  return (
    <IonPage>
      <Header title="Mi Carrito" />
      <IonContent className="ion-padding">
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
                  <IonButton
                    color="danger"
                    fill="clear"
                    onClick={() => handleRemove(product.id)}
                  >
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
