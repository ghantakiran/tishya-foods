import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { AuthProvider } from '../../components/AuthProvider';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function BlogPostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) fetchPost();
    // eslint-disable-next-line
  }, [id]);

  async function fetchPost() {
    const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
    if (error) setError(error.message);
    else {
      setPost(data);
      setTitle(data.title);
      setContent(data.content);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('blog_posts').update({ title, content }).eq('id', id);
    if (error) setError(error.message);
    else router.push('/blog');
  }

  async function handleDelete() {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) setError(error.message);
    else router.push('/blog');
  }

  if (!post) return <div className="p-6">Loading...</div>;

  return (
    <AuthProvider>
      <NavBar />
      <main className="bg-white min-h-screen py-16">
        <section className="container mx-auto px-4 flex flex-col items-center">
          <div className="max-w-xl w-full">
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h1 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">Edit Blog Post</h1>
              <form onSubmit={handleUpdate} className="flex flex-col gap-4 mb-6">
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-3 rounded-xl text-lg" required />
                <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" className="border p-3 rounded-xl h-32 text-lg" required />
                <button type="submit" className="w-full py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors duration-200 text-lg">Update Post</button>
                {error && <div className="text-red-500 text-center">{error}</div>}
              </form>
              <button onClick={handleDelete} className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-200 text-lg">Delete Post</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </AuthProvider>
  );
} 