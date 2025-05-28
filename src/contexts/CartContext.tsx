
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  provider?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
        console.log('Cart loaded from localStorage:', parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    console.log('Cart saved to localStorage:', items);
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        const updatedItems = prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('Updated existing item quantity:', newItem.name);
        return updatedItems;
      }
      const newItems = [...prev, { ...newItem, quantity: 1 }];
      console.log('Added new item to cart:', newItem.name);
      return newItems;
    });
  };

  const addToCart = addItem;

  const removeItem = (id: string) => {
    setItems(prev => {
      const updatedItems = prev.filter(item => item.id !== id);
      console.log('Removed item from cart:', id);
      return updatedItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
    console.log('Updated item quantity:', id, quantity);
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
    console.log('Cart cleared');
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      addToCart,
      removeItem,
      updateQuantity,
      clearCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
