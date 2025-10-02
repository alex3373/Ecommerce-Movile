import { WooProduct } from "./apiEcommerce";

const CART_KEY = "cart_items";

export const getCart = (): WooProduct[] => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const addToCart = (product: WooProduct) => {
  const cart = getCart();
  const existing = cart.find((p) => p.id === product.id);
  if (!existing) {
    cart.push(product);
  }
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const removeFromCart = (productId: number) => {
  const cart = getCart().filter((p) => p.id !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
