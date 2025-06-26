import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

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
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blog Post</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-2 mb-6">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-2 rounded" required />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" className="border p-2 rounded" required />
        <button type="submit" className="bg-green-600 text-white py-2 rounded">Update Post</button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
      <button onClick={handleDelete} className="bg-red-600 text-white py-2 rounded">Delete Post</button>
    </div>
  );
} 