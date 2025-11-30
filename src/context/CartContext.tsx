import { createContext } from "react";
import { SearchHotelResult } from "../types";

export interface CartItem {
  hotelId: number;
  hotelName: string;
  cityName: string;
  image: string;
  price: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (hotel: SearchHotelResult) => void;
  removeFromCart: (hotelId: number) => void;
  clearCart: () => void;
  isInCart: (hotelId: number) => boolean;
}

export const CartContext = createContext<CartContextType | null>(null);