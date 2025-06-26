import { useState } from 'react';

export default function CheckoutPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('');
  const [success, setSuccess] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Here you would create the order in Supabase
    setSuccess(true);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-100 tracking-wide">Checkout</h1>
      <div className="card p-6 rounded-lg">
        {success ? (
          <div className="text-blue-400 text-xl font-bold text-center py-8">
            Thank you for your order! 🎉
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Shipping Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Payment Details"
              value={payment}
              onChange={e => setPayment(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <button type="submit" className="btn text-lg mt-2">Place Order</button>
          </form>
        )}
      </div>
    </div>
  );
} 