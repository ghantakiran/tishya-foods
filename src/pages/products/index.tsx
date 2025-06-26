import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) setError(error.message);
    else setProducts(data || []);
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('products').insert([
      { name, description, price: parseFloat(price) }
    ]);
    if (error) setError(error.message);
    else {
      setName(''); setDescription(''); setPrice(''); setError('');
      fetchProducts();
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <form onSubmit={handleAddProduct} className="flex flex-col gap-2 mb-6">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border p-2 rounded" required />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-2 rounded" />
        <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">Add Product</button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
      <ul className="divide-y">
        {products.map(product => (
          <li key={product.id} className="py-2">
            <div className="font-semibold">{product.name}</div>
            <div className="text-sm text-gray-600">{product.description}</div>
            <div className="text-sm">${product.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 