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
    <main className="bg-white min-h-screen py-16">
      <section className="container mx-auto px-4 flex flex-col items-center">
        <div className="max-w-xl w-full">
          <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-wide text-center">Checkout</h1>
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {success ? (
              <div className="text-green-700 text-xl font-bold text-center py-8">
                Thank you for your order! 🎉
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="border p-3 rounded-xl text-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Shipping Address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="border p-3 rounded-xl text-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Payment Details"
                  value={payment}
                  onChange={e => setPayment(e.target.value)}
                  className="border p-3 rounded-xl text-lg"
                  required
                />
                <button type="submit" className="w-full py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors duration-200 text-lg mt-2">Place Order</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
} 