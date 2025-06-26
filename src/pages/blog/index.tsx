import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (error) setError(error.message);
    else setPosts(data || []);
  }

  async function handleAddPost(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('blog_posts').insert([
      { title, content, published: true }
    ]);
    if (error) setError(error.message);
    else {
      setTitle(''); setContent(''); setError('');
      fetchPosts();
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Blog</h1>
      <form onSubmit={handleAddPost} className="flex flex-col gap-2 mb-6">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="border p-2 rounded" required />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">Add Post</button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
      <ul className="divide-y">
        {posts.map(post => (
          <li key={post.id} className="py-2">
            <div className="font-semibold">{post.title}</div>
            <div className="text-sm text-gray-600">{post.content.slice(0, 100)}...</div>
          </li>
        ))}
      </ul>
    </div>
  );
} 