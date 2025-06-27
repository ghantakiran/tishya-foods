import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { AuthProvider } from '../../../components/AuthProvider';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';

const STATUS_OPTIONS = ['pending', 'shipped', 'completed', 'cancelled'];

interface Order {
  id: string;
  user_id: string;
  total: number;
  status: string;
  created_at: string;
}

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: {
    name: string;
  };
}

export default function OrderDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchOrder();
      fetchOrderItems();
    }
    // eslint-disable-next-line
  }, [id]);

  async function fetchOrder() {
    const { data, error } = await supabase.from('orders').select('*').eq('id', id).single();
    if (error) setError(error.message);
    else {
      setOrder(data);
      setStatus(data.status);
    }
  }

  async function fetchOrderItems() {
    const { data, error } = await supabase.from('order_items').select('*, product:product_id(name)').eq('order_id', id);
    if (error) setError(error.message);
    else setItems(data || []);
  }

  async function handleStatusUpdate(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    if (error) setError(error.message);
    else router.push('/admin/orders');
  }

  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <AuthProvider>
      <NavBar />
      <main className="bg-white min-h-screen py-16">
        <section className="container mx-auto px-4 flex flex-col items-center">
          <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-8">
            <h1 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">Order Details</h1>
            <div className="mb-4 text-gray-700">
              <div><b>Order ID:</b> {order.id}</div>
              <div><b>User ID:</b> {order.user_id}</div>
              <div><b>Total:</b> ${order.total}</div>
              <div><b>Created At:</b> {new Date(order.created_at).toLocaleString()}</div>
            </div>
            <form onSubmit={handleStatusUpdate} className="flex gap-2 items-center mb-6">
              <label className="font-semibold">Status:</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className="border p-3 rounded-xl text-lg">
                {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <button type="submit" className="w-full py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors duration-200 text-lg">Update</button>
            </form>
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
            <h2 className="text-xl font-bold mb-2 text-gray-900">Items</h2>
            <ul className="divide-y">
              {items.map(item => (
                <li key={item.id} className="py-2">
                  <div><b>Product:</b> {item.product?.name || item.product_id}</div>
                  <div><b>Quantity:</b> {item.quantity}</div>
                  <div><b>Price:</b> ${item.price}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </AuthProvider>
  );
} 