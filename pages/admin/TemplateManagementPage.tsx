import React, { useState, useEffect } from 'react';
import { Template } from '../../types';
import * as api from '../../services/api';
import { Modal } from '../../components/ui/Modal';
import { PlusIcon, PencilIcon, TrashIcon } from '../../components/ui/Icons';

const TemplateManagementPage: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<Partial<Template>>({ type: 'react', hasPhoto: false });
  const [previewImageFile, setPreviewImageFile] = useState<File | null>(null);
  const [latexFile, setLatexFile] = useState<File | null>(null);
  
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = () => {
    setLoading(true);
    api.adminGetTemplates()
      .then(setTemplates)
      .catch(err => console.error("Failed to fetch templates", err))
      .finally(() => setLoading(false));
  };
  
  const handleOpenModal = (template?: Template) => {
    if (template) {
        setIsEditing(true);
        setCurrentTemplate(template);
    } else {
        setIsEditing(false);
        setCurrentTemplate({ name: '', type: 'react', hasPhoto: false, category: 'Modern & Clean' });
    }
    setPreviewImageFile(null);
    setLatexFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', currentTemplate.name || '');
    formData.append('type', currentTemplate.type || 'react');
    formData.append('hasPhoto', String(currentTemplate.hasPhoto || false));
    formData.append('category', currentTemplate.category || '');
    if (previewImageFile) {
        formData.append('previewImageFile', previewImageFile);
    }
     if (latexFile && currentTemplate.type === 'latex') {
        formData.append('latexFile', latexFile);
    }

    if (isEditing && currentTemplate.id) {
        await api.adminUpdateTemplate(currentTemplate.id, formData);
    } else {
        await api.adminCreateTemplate(formData);
    }
    
    fetchTemplates();
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      await api.adminDeleteTemplate(id);
      fetchTemplates();
    }
  };

  if (loading) return <div>Loading templates...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-dark">Template Management</h1>
        <button onClick={() => handleOpenModal()} className="bg-primary text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2">
          <PlusIcon /> Add Template
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {templates.map(t => (
          <div key={t.id} className="bg-white p-2 rounded-lg shadow border group">
            <img src={t.previewImageUrl} alt={t.name} className="w-full aspect-[1/1.414] object-cover rounded-md bg-gray-200" />
            <div className="pt-2">
                <p className="font-semibold text-sm truncate">{t.name}</p>
                <p className="text-xs text-gray-500">{t.type}</p>
            </div>
            <div className="flex justify-end gap-2 pt-1">
              <button onClick={() => handleOpenModal(t)} className="text-gray-400 hover:text-primary"><PencilIcon className="w-4 h-4"/></button>
              <button onClick={() => handleDelete(t.id)} className="text-gray-400 hover:text-red-500"><TrashIcon className="w-4 h-4"/></button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={isEditing ? 'Edit Template' : 'Add New Template'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" value={currentTemplate.name} onChange={e => setCurrentTemplate({...currentTemplate, name: e.target.value})} className="input mt-1" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select value={currentTemplate.type} onChange={e => setCurrentTemplate({...currentTemplate, type: e.target.value as 'react' | 'latex'})} className="input mt-1">
              <option value="react">React Component</option>
              <option value="latex">LaTeX File</option>
            </select>
          </div>
          {currentTemplate.type === 'latex' && (
             <div>
                <label className="block text-sm font-medium text-gray-700">LaTeX File (.tex)</label>
                <input type="file" onChange={e => setLatexFile(e.target.files ? e.target.files[0] : null)} className="input mt-1" accept=".tex" required={!isEditing} />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Preview Image</label>
            <input type="file" onChange={e => setPreviewImageFile(e.target.files ? e.target.files[0] : null)} className="input mt-1" accept="image/*" required={!isEditing} />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="hasPhoto" checked={currentTemplate.hasPhoto} onChange={e => setCurrentTemplate({...currentTemplate, hasPhoto: e.target.checked})} className="h-4 w-4 text-primary border-gray-300 rounded" />
            <label htmlFor="hasPhoto" className="ml-2 block text-sm text-gray-900">Supports Profile Photo</label>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-lg">
                {isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TemplateManagementPage;
