import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../components/AuthProvider';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const LOCAL_STORAGE_KEY = 'tishya_cart';

export function useCart() {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Load cart from Supabase or localStorage
  useEffect(() => {
    if (user) {
      fetchCartFromSupabase();
    } else {
      const localCart = localStorage.getItem(LOCAL_STORAGE_KEY);
      setCart(localCart ? JSON.parse(localCart) : []);
    }
    // eslint-disable-next-line
  }, [user]);

  // Save cart to localStorage for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, user]);

  async function fetchCartFromSupabase() {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('carts')
      .select('items')
      .eq('user_id', user.id)
      .single();
    if (data && data.items) setCart(data.items);
    setLoading(false);
  }

  async function saveCartToSupabase(newCart: CartItem[]) {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from('carts')
      .upsert({ user_id: user.id, items: newCart }, { onConflict: 'user_id' });
    setLoading(false);
  }

  const addToCart = (item: CartItem) => {
    const existing = cart.find(i => i.id === item.id);
    let newCart;
    if (existing) {
      newCart = cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
    } else {
      newCart = [...cart, item];
    }
    setCart(newCart);
    if (user) saveCartToSupabase(newCart);
  };

  const updateQuantity = (id: string, quantity: number) => {
    const newCart = cart.map(i => i.id === id ? { ...i, quantity } : i);
    setCart(newCart);
    if (user) saveCartToSupabase(newCart);
  };

  const removeFromCart = (id: string) => {
    const newCart = cart.filter(i => i.id !== id);
    setCart(newCart);
    if (user) saveCartToSupabase(newCart);
  };

  const clearCart = () => {
    setCart([]);
    if (user) saveCartToSupabase([]);
    else localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return { cart, addToCart, updateQuantity, removeFromCart, clearCart, loading };
} 