import { createContext } from "react";

interface CartContextType {
    cart: string[]; // Remplacez 'any' par le type approprié pour votre cart
    setCart: React.Dispatch<React.SetStateAction<string[]>>; // Remplacez 'any' par le type approprié pour votre cart
    updateLength:(value: string) => void; 
  }
export const CartContext = createContext<CartContextType | null>(null); 


