import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { PageState } from '../App';
import * as api from '../services/api';
import { marked } from 'marked';
import { ArrowLeftIcon } from '../components/ui/Icons';

interface BlogDetailPageProps {
  slug: string;
  onNavigate: (page: PageState) => void;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ slug, onNavigate }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [postHtml, setPostHtml] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await api.getBlogPostBySlug(slug);
        setPost(fetchedPost);
        const html = await marked.parse(fetchedPost.content);
        setPostHtml(html);
      } catch (err: any) {
        setError(err.message || 'Failed to load blog post.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);
  
  if (loading) {
    return <div className="text-center p-12">Loading article...</div>;
  }
  
  if (error) {
    return <div className="text-center text-red-500 bg-red-50 p-4 rounded-md">{error}</div>;
  }

  if (!post) {
      return <div className="text-center p-12">Post not found.</div>
  }

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <button 
        onClick={() => onNavigate({ name: 'blog' })}
        className="flex items-center gap-2 text-muted hover:text-primary transition-colors duration-200 text-sm font-medium mb-8"
      >
        <ArrowLeftIcon />
        Back to Blog
      </button>

      <article>
        <p className="text-primary font-semibold">{post.category}</p>
        <h1 className="text-4xl font-extrabold text-dark my-2">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full" />
          <div>
            <span>By <strong>{post.author}</strong></span>
            <span className="mx-2">&bull;</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        
        <img src={post.imageUrl} alt={post.title} className="w-full h-80 object-cover rounded-lg mb-8" />
        
        <div 
            className="prose lg:prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: postHtml }}
        />
      </article>
    </div>
  );
};

export default BlogDetailPage;