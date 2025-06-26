import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

const STATUS_OPTIONS = ['pending', 'shipped', 'completed', 'cancelled'];

export default function OrderDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="mb-4">
        <div><b>Order ID:</b> {order.id}</div>
        <div><b>User ID:</b> {order.user_id}</div>
        <div><b>Total:</b> ${order.total}</div>
        <div><b>Created At:</b> {new Date(order.created_at).toLocaleString()}</div>
      </div>
      <form onSubmit={handleStatusUpdate} className="flex gap-2 items-center mb-6">
        <label className="font-semibold">Status:</label>
        <select value={status} onChange={e => setStatus(e.target.value)} className="border p-2 rounded">
          {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">Update</button>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <h2 className="text-xl font-bold mb-2">Items</h2>
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
  );
} 