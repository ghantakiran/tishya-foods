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
    <main className="bg-white min-h-screen py-16">
      <section className="container mx-auto px-4 flex flex-col items-center">
        <div className="max-w-6xl w-full">
          <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-wide text-center">Order Management</h1>
          <div className="bg-white rounded-3xl shadow-xl p-8">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-700 border-b border-gray-200">
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
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-2 text-gray-900 font-bold">{order.id}</td>
                    <td className="text-gray-600">{order.user_id}</td>
                    <td className="text-green-700 font-bold">${order.total}</td>
                    <td className="text-gray-900">{order.status}</td>
                    <td className="text-gray-600">{new Date(order.created_at).toLocaleString()}</td>
                    <td>
                      <Link href={`/admin/orders/${order.id}`}>View</Link>
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
      </section>
    </main>
  );
} 