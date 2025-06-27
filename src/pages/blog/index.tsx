import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: boolean;
  created_at: string;
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
    <main className="bg-white min-h-screen py-16">
      <section className="container mx-auto px-4 flex flex-col items-center">
        <div className="max-w-4xl w-full">
          <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-wide text-center">Blog & Recipes</h1>
          {/* Add Post Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Add New Blog Post</h2>
            <form onSubmit={handleAddPost} className="flex flex-col gap-4">
              <input 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="Post Title" 
                className="border p-3 rounded-xl text-lg" 
                required 
              />
              <textarea 
                value={content} 
                onChange={e => setContent(e.target.value)} 
                placeholder="Post Content" 
                className="border p-3 rounded-xl h-32 text-lg" 
                required 
              />
              <button type="submit" className="w-full py-3 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors duration-200 text-lg mt-2">Add Post</button>
              {error && <div className="text-red-500 text-center">{error}</div>}
            </form>
          </div>
          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map(post => (
              <article key={post.id} className="bg-white rounded-3xl shadow-xl p-6 flex flex-col justify-between">
                <h3 className="font-bold text-xl mb-3 text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {post.content.length > 150 
                    ? `${post.content.slice(0, 150)}...` 
                    : post.content
                  }
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm text-gray-400">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Link href={`/blog/${post.id}`}>Edit</Link>
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {posts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No blog posts available. Add your first post above!
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 