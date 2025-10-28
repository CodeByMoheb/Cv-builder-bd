import React, { useState, useEffect } from 'react';
import { SavedResume } from '../types';
import { TEMPLATES_MAP } from '../constants';
import { PencilIcon, TrashIcon, DownloadIcon, DuplicateIcon, DocumentTextIcon, PlusIcon } from '../components/ui/Icons';
import * as api from '../services/api';

interface DashboardPageProps {
  onEdit: (id: string) => void;
  onDownload: (id: string) => void;
  onCreateNew: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onEdit, onDownload, onCreateNew }) => {
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        setLoading(true);
        const userResumes = await api.getResumes();
        setResumes(userResumes);
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      await api.deleteResume(id);
      setResumes(resumes.filter(cv => cv.id !== id));
    }
  };

  const handleDuplicate = async (id: string) => {
    const newCv = await api.duplicateResume(id);
    setResumes(prev => [...prev, newCv]);
  };

  if (loading) {
    return <div className="text-center p-12">Loading your resumes...</div>;
  }
  
  const sortedResumes = [...resumes].sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark">My Dashboard</h1>
          <p className="mt-1 text-muted">Manage all your created resumes in one place.</p>
        </div>
        <button
          onClick={onCreateNew}
          className="bg-primary text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-transform duration-200 hover:scale-105"
        >
          <PlusIcon className="w-5 h-5" />
          Create New CV
        </button>
      </div>

      {sortedResumes.length === 0 ? (
        <div className="text-center py-20 px-6 bg-secondary rounded-lg border-2 border-dashed">
          <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-xl font-medium text-dark">No Resumes Found</h3>
          <p className="mt-1 text-muted">
            You haven't created any resumes yet. Get started by creating a new one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedResumes.map(cv => {
            const template = TEMPLATES_MAP[cv.templateId];
            if (!template) return null;
            const TemplatePreviewComponent = template.component;
            
            return (
              <div key={cv.id} className="group bg-white rounded-lg shadow-md border flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                <div className="aspect-[1/1.414] bg-gray-200 overflow-hidden">
                  <div className="pointer-events-none transform-gpu scale-[0.28] origin-top-left">
                    <div className="w-[595pt] h-[842pt] bg-white">
                      <TemplatePreviewComponent resumeData={cv.resumeData} />
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t flex-grow flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-dark truncate">{cv.name}</h3>
                        <p className="text-xs text-muted">Template: {template.name}</p>
                        <p className="text-xs text-muted mt-1">
                            Last modified: {new Date(cv.lastModified).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="mt-3 pt-3 border-t flex justify-around items-center">
                        <button onClick={() => onEdit(cv.id)} className="text-muted hover:text-primary transition-colors" title="Edit"><PencilIcon className="w-5 h-5"/></button>
                        <button onClick={() => handleDuplicate(cv.id)} className="text-muted hover:text-primary transition-colors" title="Duplicate"><DuplicateIcon className="w-5 h-5"/></button>
                        <button onClick={() => onDownload(cv.id)} className="text-muted hover:text-primary transition-colors" title="Download"><DownloadIcon className="w-5 h-5"/></button>
                        <button onClick={() => handleDelete(cv.id, cv.name)} className="text-muted hover:text-red-500 transition-colors" title="Delete"><TrashIcon className="w-5 h-5"/></button>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;