import { useEffect, useState } from 'react';
import Link from 'next/link';
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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-100 tracking-wide">Our Products</h1>
      {/* Add Product Form */}
      <div className="card p-6 rounded-lg mb-10">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="flex flex-col gap-3">
          <input 
            value={name} 
            onChange={e => setName(e.target.value)} 
            placeholder="Product Name" 
            className="border p-2 rounded" 
            required 
          />
          <input 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            placeholder="Description" 
            className="border p-2 rounded" 
          />
          <input 
            value={price} 
            onChange={e => setPrice(e.target.value)} 
            placeholder="Price" 
            type="number" 
            step="0.01"
            className="border p-2 rounded" 
            required 
          />
          <button type="submit" className="btn mt-2">Add Product</button>
          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product.id} className="card p-6 flex flex-col justify-between">
            <div className="h-32 bg-[#232323] rounded mb-3 flex items-center justify-center border border-[#262626]">
              <span className="text-gray-500">Product Image</span>
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-100">{product.name}</h3>
            <p className="text-gray-300 text-sm mb-3">{product.description}</p>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-2xl font-bold text-blue-400">${product.price}</span>
              <div className="flex gap-2">
                <Link 
                  href={`/products/${product.id}`}
                  className="btn text-sm"
                >
                  Edit
                </Link>
                <Link 
                  href="/cart"
                  className="btn text-sm"
                >
                  Add to Cart
                </Link>
              </div>
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