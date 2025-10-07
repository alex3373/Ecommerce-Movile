// src/services/cartService.ts
import { Preferences } from "@capacitor/preferences";
import { WooProduct } from "./apiEcommerce";

const CART_KEY = "cart_items";

export const getCart = async (): Promise<WooProduct[]> => {
  const { value } = await Preferences.get({ key: CART_KEY });
  return value ? JSON.parse(value) : [];
};

export const addToCart = async (product: WooProduct) => {
  const currentCart = await getCart();
  const existing = currentCart.find((p) => p.id === product.id);
  if (!existing) {
    currentCart.push(product);
  }
  await Preferences.set({ key: CART_KEY, value: JSON.stringify(currentCart) });
};

export const removeFromCart = async (productId: number) => {
  const currentCart = await getCart();
  const updated = currentCart.filter((p) => p.id !== productId);
  await Preferences.set({ key: CART_KEY, value: JSON.stringify(updated) });
};

export const clearCart = async () => {
  await Preferences.remove({ key: CART_KEY });
};
