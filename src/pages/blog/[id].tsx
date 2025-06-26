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
      <div className="max-w-xl mx-auto p-6">
        <div className="card p-8 rounded-lg">
          <h1 className="text-3xl font-extrabold mb-6 text-gray-100 text-center">Edit Blog Post</h1>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4 mb-6">
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-2 rounded" required />
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" className="border p-2 rounded h-32" required />
            <button type="submit" className="btn text-lg">Update Post</button>
            {error && <div className="text-red-500 text-center">{error}</div>}
          </form>
          <button onClick={handleDelete} className="btn text-lg bg-red-600 hover:bg-red-700">Delete Post</button>
        </div>
      </div>
      <Footer />
    </AuthProvider>
  );
} 