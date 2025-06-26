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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog & Recipes</h1>
      
      {/* Add Post Form */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Blog Post</h2>
        <form onSubmit={handleAddPost} className="flex flex-col gap-3">
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Post Title" 
            className="border p-2 rounded" 
            required 
          />
          <textarea 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            placeholder="Post Content" 
            className="border p-2 rounded h-32" 
            required 
          />
          <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Add Post
          </button>
          {error && <div className="text-red-500">{error}</div>}
        </form>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <article key={post.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-xl mb-3">{post.title}</h3>
            <p className="text-gray-600 mb-4">
              {post.content.length > 150 
                ? `${post.content.slice(0, 150)}...` 
                : post.content
              }
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <Link 
                  href={`/blog/${post.id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Edit
                </Link>
                <Link 
                  href={`/blog/${post.id}`}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  Read More
                </Link>
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
  );
} 