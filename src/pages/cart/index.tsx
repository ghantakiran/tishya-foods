import { useState } from 'react';

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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <ul className="divide-y mb-4">
            {cart.map(item => (
              <li key={item.id} className="py-2 flex justify-between items-center">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm">${item.price} x </div>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="border p-1 rounded w-16 ml-2"
                  />
                </div>
                <button onClick={() => handleRemove(item.id)} className="bg-red-600 text-white px-2 py-1 rounded">Remove</button>
              </li>
            ))}
          </ul>
          <div className="font-bold mb-4">Total: ${total.toFixed(2)}</div>
          <a href="/cart/checkout" className="bg-blue-600 text-white py-2 px-4 rounded">Proceed to Checkout</a>
        </>
      )}
    </div>
  );
} 