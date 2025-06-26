import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-wide text-center">Our Products</h1>
      {/* Add Product Form */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-green-700">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
          <input 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Product Name" 
            className="border p-3 rounded-xl text-lg" 
            required 
          />
          <input 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            placeholder="Description" 
            className="border p-3 rounded-xl text-lg" 
          />
          <input 
            value={price} 
            onChange={e => setPrice(e.target.value)} 
            placeholder="Price" 
            type="number" 
            step="0.01"
            className="border p-3 rounded-xl text-lg" 
            required 
          />
          <button type="submit" className="w-full py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors duration-200 text-lg mt-2">Add Product</button>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </form>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center group"
          >
            <div className="w-full h-56 flex items-center justify-center mb-4">
              <Image
                src={product.image_url || '/logo.png'}
                alt={product.name}
                width={220}
                height={220}
                className="object-contain rounded-2xl group-hover:scale-105 transition-transform duration-300 bg-gray-50"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 text-center">{product.name}</h3>
            <p className="text-gray-500 mb-4 text-center">{product.description}</p>
            <span className="text-2xl font-bold text-green-700 mb-4">${product.price}</span>
            <div className="flex gap-2 w-full">
              <Link href={`/products/${product.id}`} className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 text-center transition-colors duration-200">Edit</Link>
              <Link href="/cart" className="flex-1 py-2 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 text-center transition-colors duration-200">Add to Cart</Link>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products available. Add your first product above!
        </div>
      )}
    </div>
  );
} 