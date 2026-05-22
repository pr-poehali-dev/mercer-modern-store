import { useState, useCallback } from 'react';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

let cartItems: CartItem[] = [];
let listeners: Array<() => void> = [];

const notify = () => listeners.forEach(l => l());

export const cartStore = {
  getItems: () => cartItems,

  addItem: (item: Omit<CartItem, 'quantity'>) => {
    const existing = cartItems.find(
      i => i.productId === item.productId && i.size === item.size && i.color === item.color
    );
    if (existing) {
      existing.quantity += 1;
    } else {
      cartItems = [...cartItems, { ...item, quantity: 1 }];
    }
    notify();
  },

  removeItem: (productId: number, size: string, color: string) => {
    cartItems = cartItems.filter(
      i => !(i.productId === productId && i.size === size && i.color === color)
    );
    notify();
  },

  updateQuantity: (productId: number, size: string, color: string, qty: number) => {
    if (qty <= 0) {
      cartStore.removeItem(productId, size, color);
      return;
    }
    cartItems = cartItems.map(i =>
      i.productId === productId && i.size === size && i.color === color
        ? { ...i, quantity: qty }
        : i
    );
    notify();
  },

  clear: () => {
    cartItems = [];
    notify();
  },

  getTotal: () => cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
  getCount: () => cartItems.reduce((sum, i) => sum + i.quantity, 0),

  subscribe: (fn: () => void) => {
    listeners.push(fn);
    return () => { listeners = listeners.filter(l => l !== fn); };
  },
};

export function useCart() {
  const [, setV] = useState(0);
  const rerender = useCallback(() => setV(v => v + 1), []);

  useState(() => {
    const unsub = cartStore.subscribe(rerender);
    return unsub;
  });

  return {
    items: cartStore.getItems(),
    addItem: cartStore.addItem,
    removeItem: cartStore.removeItem,
    updateQuantity: cartStore.updateQuantity,
    total: cartStore.getTotal(),
    count: cartStore.getCount(),
    clear: cartStore.clear,
  };
}
