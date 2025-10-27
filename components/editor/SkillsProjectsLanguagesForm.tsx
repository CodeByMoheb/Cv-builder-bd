import React from 'react';
import { ResumeData } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { TrashIcon, PlusIcon } from '../ui/Icons';

interface FormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const SkillsProjectsLanguagesForm: React.FC<FormProps> = ({ resumeData, setResumeData }) => {

    const handleSkillChange = (index: number, value: string) => {
        setResumeData(prev => {
            const newSkills = [...prev.skills];
            newSkills[index] = { ...newSkills[index], name: value };
            return { ...prev, skills: newSkills };
        });
    };

    const addSkill = () => {
        setResumeData(prev => ({ ...prev, skills: [...prev.skills, { id: uuidv4(), name: '' }] }));
    };

    const removeSkill = (id: string) => {
        setResumeData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
    };

    const handleProjectChange = (index: number, field: keyof ResumeData['projects'][number], value: string) => {
        setResumeData(prev => {
            const newProjects = [...prev.projects];
            newProjects[index] = { ...newProjects[index], [field]: value };
            return { ...prev, projects: newProjects };
        });
    };

    const addProject = () => {
        setResumeData(prev => ({ ...prev, projects: [...prev.projects, { id: uuidv4(), name: '', description: '', url: '' }] }));
    };

    const removeProject = (id: string) => {
        setResumeData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    };
    
    const handleLanguageChange = (index: number, value: string) => {
        setResumeData(prev => {
            const newLangs = [...prev.languages];
            newLangs[index] = { ...newLangs[index], name: value };
            return { ...prev, languages: newLangs };
        });
    };

    const addLanguage = () => {
        setResumeData(prev => ({ ...prev, languages: [...prev.languages, { id: uuidv4(), name: '' }] }));
    };

    const removeLanguage = (id: string) => {
        setResumeData(prev => ({ ...prev, languages: prev.languages.filter(l => l.id !== id) }));
    };

    return (
        <div className="space-y-8">
            {/* Skills Section */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {resumeData.skills.map((skill, index) => (
                        <div key={skill.id} className="flex items-center">
                            <input type="text" placeholder="e.g., React" value={skill.name} onChange={e => handleSkillChange(index, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-l-md"/>
                            <button onClick={() => removeSkill(skill.id)} className="p-2.5 border border-l-0 border-red-500 bg-red-500 text-white rounded-r-md"><TrashIcon className="w-4 h-4" /></button>
                        </div>
                    ))}
                </div>
                <button onClick={addSkill} className="mt-4 text-primary font-semibold flex items-center gap-1"><PlusIcon /> Add Skill</button>
            </div>

            {/* Projects Section */}
            <div>
                 <h3 className="text-lg font-semibold mb-2">Projects</h3>
                 <div className="space-y-4">
                    {resumeData.projects.map((proj, index) => (
                        <div key={proj.id} className="p-4 border rounded-md space-y-4 bg-gray-50/50">
                            <input type="text" placeholder="Project Name" value={proj.name} onChange={e => handleProjectChange(index, 'name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                            <textarea placeholder="Project Description" value={proj.description} onChange={e => handleProjectChange(index, 'description', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md h-20"/>
                            <button onClick={() => removeProject(proj.id)} className="text-red-500 hover:text-red-700 font-semibold flex items-center justify-center gap-1 text-sm"><TrashIcon /> Remove Project</button>
                        </div>
                    ))}
                </div>
                 <button onClick={addProject} className="mt-4 text-primary font-semibold flex items-center gap-1"><PlusIcon /> Add Project</button>
            </div>
            
            {/* Languages Section */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Languages</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {resumeData.languages.map((lang, index) => (
                        <div key={lang.id} className="flex items-center">
                            <input type="text" placeholder="e.g., Spanish (Fluent)" value={lang.name} onChange={e => handleLanguageChange(index, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-l-md"/>
                            <button onClick={() => removeLanguage(lang.id)} className="p-2.5 border border-l-0 border-red-500 bg-red-500 text-white rounded-r-md"><TrashIcon className="w-4 h-4" /></button>
                        </div>
                    ))}
                </div>
                <button onClick={addLanguage} className="mt-4 text-primary font-semibold flex items-center gap-1"><PlusIcon /> Add Language</button>
            </div>
        </div>
    );
};

export default SkillsProjectsLanguagesForm;
