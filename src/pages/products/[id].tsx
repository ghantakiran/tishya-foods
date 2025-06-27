import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { AuthProvider } from '../../components/AuthProvider';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  created_at: string;
}

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState<string | undefined>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setImageUrl(data.image_url);
      setPreviewUrl(data.image_url);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    let uploadedImageUrl = imageUrl;
    if (imageFile) {
      // Upload to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${id}-${Date.now()}.${fileExt}`;
      const { error: storageError } = await supabase.storage.from('product-images').upload(fileName, imageFile, { upsert: true });
      if (storageError) {
        setError('Image upload failed: ' + storageError.message);
        return;
      }
      const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(fileName);
      uploadedImageUrl = publicUrlData.publicUrl;
    }
    const { error } = await supabase.from('products').update({ name, description, price: parseFloat(price), image_url: uploadedImageUrl }).eq('id', id);
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
      <main className="bg-white min-h-screen py-16">
        <section className="container mx-auto px-4 flex flex-col items-center">
          <div className="max-w-xl w-full">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h1 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">Edit Product</h1>
              <form onSubmit={handleUpdate} className="flex flex-col gap-4 mb-6">
                {previewUrl && (
                  <div className="flex justify-center mb-2">
                    <Image src={previewUrl} alt="Product Image" width={180} height={180} className="rounded-lg object-cover" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="border p-3 rounded-xl text-lg"
                />
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" className="border p-3 rounded-xl text-lg" required />
                <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-3 rounded-xl text-lg" />
                <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" className="border p-3 rounded-xl text-lg" required />
                <button type="submit" className="w-full py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors duration-200 text-lg">Update Product</button>
                {error && <div className="text-red-500 text-center">{error}</div>}
              </form>
              <button onClick={handleDelete} className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-200 text-lg">Delete Product</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </AuthProvider>
  );
} 