import { createContext } from "react";

export interface CartItem {
  hotelId: number;
  hotelName: string;
  cityName: string;
  image: string;
  price: number;
  checkInDate?: string;
  checkOutDate?: string;
  adults?: number;
  children?: number;
}

export type AddToCartPayload = {
  hotelId: number;
  hotelName: string;
  cityName: string;
  image: string;
  price: number;
  checkInDate?: string;
  checkOutDate?: string;
  adults?: number;
  children?: number;
};

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: AddToCartPayload) => void;
  removeFromCart: (hotelId: number) => void;
  clearCart: () => void;
  isInCart: (hotelId: number) => boolean;
}

export const CartContext = createContext<CartContextType | null>(null);