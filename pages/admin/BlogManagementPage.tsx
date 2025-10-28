import React, { useState, useEffect } from 'react';
import { BlogPost } from '../../types';
import * as api from '../../services/api';
import { Modal } from '../../components/ui/Modal';
import { PlusIcon, PencilIcon, TrashIcon } from '../../components/ui/Icons';
import BlogPostEditor from '../../components/admin/BlogPostEditor';

const BlogManagementPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    api.adminGetBlogPosts()
      .then(setPosts)
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleOpenModal = (post?: BlogPost) => {
    setCurrentPost(post || {});
    setIsModalOpen(true);
  };

  const handleSave = async (postData: Partial<BlogPost>) => {
    if (postData.id) {
      await api.adminUpdateBlogPost(postData.id, postData);
    } else {
      await api.adminCreateBlogPost(postData);
    }
    fetchPosts();
    setIsModalOpen(false);
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
        await api.adminDeleteBlogPost(id);
        fetchPosts();
    }
  };

  if (loading) return <div>Loading posts...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-dark">Blog Management</h1>
        <button onClick={() => handleOpenModal()} className="bg-primary text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
          <PlusIcon /> New Post
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.category}</td>
                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.author}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => handleOpenModal(post)} className="text-primary hover:text-primary/80"><PencilIcon className="w-5 h-5"/></button>
                    <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-800"><TrashIcon className="w-5 h-5"/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      
      {isModalOpen && currentPost && (
        <BlogPostEditor 
            post={currentPost}
            onSave={handleSave}
            onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BlogManagementPage;
