import React, { useState } from 'react';
import { BlogPost } from '../../types';
import { Modal } from '../ui/Modal';

interface BlogPostEditorProps {
  post: Partial<BlogPost>;
  onSave: (postData: Partial<BlogPost>) => void;
  onClose: () => void;
}

const BlogPostEditor: React.FC<BlogPostEditorProps> = ({ post, onSave, onClose }) => {
  const [postData, setPostData] = useState(post);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  
  const handleSave = () => {
    // Basic validation
    if (!postData.title || !postData.slug || !postData.content) {
      alert("Title, Slug, and Content are required.");
      return;
    }
    onSave(postData);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={post.id ? 'Edit Blog Post' : 'Create New Post'}>
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" name="title" value={postData.title || ''} onChange={handleChange} className="input mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug (URL-friendly)</label>
          <input type="text" name="slug" value={postData.slug || ''} onChange={handleChange} className="input mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Excerpt</label>
          <textarea name="excerpt" value={postData.excerpt || ''} onChange={handleChange} className="input mt-1 h-20 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Content (Markdown)</label>
          <textarea name="content" value={postData.content || ''} onChange={handleChange} className="input mt-1 h-48 resize-none font-mono" />
        </div>
         <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input type="text" name="category" value={postData.category || ''} onChange={handleChange} className="input mt-1" />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">Author</label>
              <input type="text" name="author" value={postData.author || ''} onChange={handleChange} className="input mt-1" />
            </div>
        </div>
         <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input type="text" name="imageUrl" value={postData.imageUrl || ''} onChange={handleChange} className="input mt-1" />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700">Author Avatar URL</label>
              <input type="text" name="authorAvatar" value={postData.authorAvatar || ''} onChange={handleChange} className="input mt-1" />
            </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
            <button onClick={handleSave} className="bg-primary text-white font-bold py-2 px-4 rounded-lg">Save Post</button>
        </div>
      </div>
    </Modal>
  );
};

export default BlogPostEditor;
