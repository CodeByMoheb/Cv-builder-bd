import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { PageState } from '../App';
import * as api from '../services/api';

interface BlogPageProps {
  onNavigate: (page: PageState) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await api.getBlogPosts();
        setPosts(fetchedPosts);
      } catch (err: any) {
        setError(err.message || 'Failed to load blog posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-dark">Our Blog</h1>
        <p className="mt-2 text-lg text-muted">Career advice, resume tips, and industry insights to help you land your dream job.</p>
      </div>

      {loading && <div className="text-center">Loading posts...</div>}
      {error && <div className="text-center text-red-500 bg-red-50 p-4 rounded-md">{error}</div>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => onNavigate({ name: 'blogDetail', params: { slug: post.slug } })}
              className="bg-white rounded-lg shadow-md border overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <p className="text-sm text-primary font-semibold mb-2">{post.category}</p>
                <h2 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                <p className="text-sm text-muted mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 border-t pt-4">
                  <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="font-semibold">{post.author}</p>
                    <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;