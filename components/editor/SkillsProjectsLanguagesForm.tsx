// FIX: Created the content for the missing SkillsProjectsLanguagesForm.tsx file.
import React from 'react';
import { ResumeData } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { TrashIcon, PlusIcon, PresentationChartLineIcon } from '../ui/Icons';

interface SkillsProjectsLanguagesFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const EditableList: React.FC<{
    items: { id: string, name: string }[];
    onAdd: () => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, value: string) => void;
    title: string;
    placeholder: string;
}> = ({ items, onAdd, onRemove, onUpdate, title, placeholder }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <div className="space-y-2">
                {items.map(item => (
                    <div key={item.id} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) => onUpdate(item.id, e.target.value)}
                            placeholder={placeholder}
                            className="input"
                        />
                        <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                           <TrashIcon />
                        </button>
                    </div>
                ))}
            </div>
             <button onClick={onAdd} className="mt-2 text-sm text-primary hover:underline flex items-center gap-1">
                <PlusIcon /> Add {title.slice(0,-1)}
            </button>
        </div>
    );
};

const SkillsProjectsLanguagesForm: React.FC<SkillsProjectsLanguagesFormProps> = ({ resumeData, setResumeData }) => {
    
    const addSkill = () => setResumeData(p => ({ ...p, skills: [...p.skills, { id: uuidv4(), name: '' }] }));
    const removeSkill = (id: string) => setResumeData(p => ({ ...p, skills: p.skills.filter(s => s.id !== id) }));
    const updateSkill = (id: string, name: string) => setResumeData(p => ({ ...p, skills: p.skills.map(s => s.id === id ? { ...s, name } : s) }));
    
    const addLanguage = () => setResumeData(p => ({ ...p, languages: [...p.languages, { id: uuidv4(), name: '' }] }));
    const removeLanguage = (id: string) => setResumeData(p => ({ ...p, languages: p.languages.filter(l => l.id !== id) }));
    const updateLanguage = (id: string, name: string) => setResumeData(p => ({ ...p, languages: p.languages.map(l => l.id === id ? { ...l, name } : l) }));

    const addProject = () => setResumeData(p => ({...p, projects: [...p.projects, { id: uuidv4(), name: '', description: '', url: ''}]}));
    const removeProject = (id: string) => setResumeData(p => ({...p, projects: p.projects.filter(proj => proj.id !== id)}));
    const updateProject = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setResumeData(p => ({ ...p, projects: p.projects.map(proj => proj.id === id ? {...proj, [name]: value} : proj)}));
    };

    return (
        <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 animate-fadeIn">
            <div className="space-y-8">
                <EditableList
                    items={resumeData.skills}
                    onAdd={addSkill}
                    onRemove={removeSkill}
                    onUpdate={updateSkill}
                    title="Skills"
                    placeholder="e.g., React"
                />
                
                <EditableList
                    items={resumeData.languages}
                    onAdd={addLanguage}
                    onRemove={removeLanguage}
                    onUpdate={updateLanguage}
                    title="Languages"
                    placeholder="e.g., English (Native)"
                />
            </div>

            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Projects</h3>
                <div className="space-y-4">
                    {resumeData.projects.length === 0 ? (
                        <div className="text-center py-8 px-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                            <PresentationChartLineIcon className="mx-auto h-10 w-10 text-gray-400" />
                            <h3 className="mt-2 text-md font-medium text-gray-900">Showcase Your Projects</h3>
                            <p className="mt-1 text-xs text-gray-500">
                                Add personal or professional projects to highlight your skills.
                            </p>
                        </div>
                    ) : (
                        resumeData.projects.map(proj => (
                             <div key={proj.id} className="p-4 border rounded-lg space-y-3 bg-gray-50/50 relative">
                                 <button onClick={() => removeProject(proj.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                                    <TrashIcon />
                                 </button>
                                 <div>
                                   <label htmlFor={`proj-name-${proj.id}`} className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                                   <input type="text" id={`proj-name-${proj.id}`} name="name" placeholder="e.g., Portfolio Website" value={proj.name} onChange={e => updateProject(proj.id, e)} className="input" />
                                 </div>
                                 <div>
                                   <label htmlFor={`proj-desc-${proj.id}`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                   <textarea id={`proj-desc-${proj.id}`} name="description" placeholder="A short description of your project..." value={proj.description} onChange={e => updateProject(proj.id, e)} className="input h-20 resize-none" />
                                 </div>
                                 <div>
                                   <label htmlFor={`proj-url-${proj.id}`} className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                                   <input type="text" id={`proj-url-${proj.id}`} name="url" placeholder="e.g., github.com/user/repo" value={proj.url} onChange={e => updateProject(proj.id, e)} className="input" />
                                 </div>
                             </div>
                        ))
                    )}
                </div>
                <button onClick={addProject} className="mt-2 text-sm text-primary hover:underline flex items-center gap-1">
                    <PlusIcon /> Add Project
                </button>
            </div>
        </div>
    );
};

export default SkillsProjectsLanguagesForm;