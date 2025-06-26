import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { AuthProvider } from '../../components/AuthProvider';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  created_at: string;
}

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) fetchProduct();
    // eslint-disable-next-line
  }, [id]);

  async function fetchProduct() {
    const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
    if (error) setError(error.message);
    else {
      setProduct(data);
      setName(data.name);
      setDescription(data.description);
      setPrice(data.price.toString());
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('products').update({ name, description, price: parseFloat(price) }).eq('id', id);
    if (error) setError(error.message);
    else router.push('/products');
  }

  async function handleDelete() {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) setError(error.message);
    else router.push('/products');
  }

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <AuthProvider>
      <NavBar />
      <div className="max-w-xl mx-auto p-6">
        <div className="card p-8 rounded-lg">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-100 text-center">Edit Product</h1>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4 mb-6">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border p-2 rounded" required />
            <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-2 rounded" />
            <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" className="border p-2 rounded" required />
            <button type="submit" className="btn text-lg">Update Product</button>
            {error && <div className="text-red-500 text-center">{error}</div>}
          </form>
          <button onClick={handleDelete} className="btn text-lg bg-red-600 hover:bg-red-700">Delete Product</button>
        </div>
      </div>
      <Footer />
    </AuthProvider>
  );
} 