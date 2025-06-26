import { useState } from 'react';

export default function CheckoutPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would create the order in Supabase
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Order Placed!</h1>
        <p>Thank you for your purchase. Your order has been placed successfully.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="border p-2 rounded" required />
        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Shipping Address" className="border p-2 rounded" required />
        <button type="submit" className="bg-green-600 text-white py-2 rounded">Place Order</button>
      </form>
    </div>
  );
} 