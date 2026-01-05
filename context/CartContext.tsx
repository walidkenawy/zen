
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Retreat } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (retreat: Retreat, date: string, guests: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('zen_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('zen_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (retreat: Retreat, date: string, guests: number) => {
    const newItem: CartItem = {
      id: `${retreat.id}-${date}-${Math.random().toString(36).substr(2, 9)}`,
      retreat,
      selectedDate: date,
      guests
    };
    setCart(prev => [...prev, newItem]);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.length;
  const subtotal = cart.reduce((acc, item) => acc + (item.retreat.price * item.guests), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
