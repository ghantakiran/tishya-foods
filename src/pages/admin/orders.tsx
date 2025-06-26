import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface Order {
  id: string;
  user_id: string;
  total: number;
  status: string;
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setOrders(data || []);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-100 tracking-wide">Order Management</h1>
      <div className="card p-6 rounded-lg">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <table className="w-full text-left">
          <thead>
            <tr className="text-blue-400 border-b border-[#262626]">
              <th className="py-2">Order ID</th>
              <th>User ID</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b border-[#262626] hover:bg-[#232323]">
                <td className="py-2 text-blue-300 font-bold">{order.id}</td>
                <td className="text-gray-400">{order.user_id}</td>
                <td className="text-blue-400 font-bold">${order.total}</td>
                <td className="text-white">{order.status}</td>
                <td className="text-gray-400">{new Date(order.created_at).toLocaleString()}</td>
                <td>
                  <Link href={`/admin/orders/${order.id}`} className="btn text-sm">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
} 