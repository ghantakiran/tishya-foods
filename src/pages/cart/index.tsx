import { useState } from 'react';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Demo cart data (replace with persistent storage or Supabase integration as needed)
const initialCart: CartItem[] = [
  // Example: { id: '1', name: 'Sample Product', price: 19.99, quantity: 2 }
];

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const handleQuantityChange = (id: string, quantity: number) => {
    setCart(cart => cart.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemove = (id: string) => {
    setCart(cart => cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-100 tracking-wide">Your Cart</h1>
      <div className="card p-6 rounded-lg">
        {cart.length === 0 ? (
          <div className="text-gray-400 text-lg">Your cart is empty.</div>
        ) : (
          <>
            <ul className="divide-y mb-4">
              {cart.map(item => (
                <li key={item.id} className="py-4 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-lg text-gray-100">{item.name}</div>
                    <div className="text-sm text-gray-400">${item.price} x </div>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="border p-1 rounded w-16 ml-2 bg-[#232323] text-white border-[#444]"
                    />
                  </div>
                  <button onClick={() => handleRemove(item.id)} className="btn text-sm">Remove</button>
                </li>
              ))}
            </ul>
            <div className="font-bold mb-4 text-2xl text-blue-400">Total: ${total.toFixed(2)}</div>
            <Link href="/cart/checkout" className="btn text-lg">Proceed to Checkout</Link>
          </>
        )}
      </div>
    </div>
  );
} 