import { useState, ReactNode, useEffect } from "react";
import { CartContext, CartItem, AddToCartPayload } from "./CartContext";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [toast, setToast] = useState("");
  
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (item: AddToCartPayload) => {
    if (items.some((i) => i.hotelId === item.hotelId)) {
      return showToast("Already in your cart!");
    }
    
    setItems((prev) => [...prev, item]);
    showToast("Added to cart!");
  };

  const removeFromCart = (hotelId: number) => {
    setItems((prev) => prev.filter((item) => item.hotelId !== hotelId));
    showToast("Removed from cart.");
  };

  const clearCart = () => {
    setItems([])
    showToast("Cart cleared.");};
    
  const isInCart = (hotelId: number) =>
    items.some((i) => i.hotelId === hotelId);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isInCart }}>
      {children}
      {toast && <div className="toastWrapper">{toast}</div>}
    </CartContext.Provider>
  );
};
