import React from 'react';
import { ResumeData } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { SparklesIcon, TrashIcon, PlusIcon } from '../ui/Icons';
import { generateContentSuggestion } from '../../services/geminiService';

interface FormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const ExperienceForm: React.FC<FormProps> = ({ resumeData, setResumeData }) => {

    const handleArrayChange = (index: number, field: string, value: string) => {
        setResumeData(prev => {
            const newExperience = [...prev.experience];
            newExperience[index] = { ...newExperience[index], [field]: value };
            return { ...prev, experience: newExperience };
        });
    };

    const addExperience = () => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, {id: uuidv4(), title: '', company: '', location: '', startDate: '', endDate: '', description: ''}],
        }));
    };

    const removeExperience = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.filter(item => item.id !== id),
        }));
    };
    
    const handleDescriptionAssist = async (index: number, currentValue: string) => {
        const prompt = `Rewrite this job description point to be more impactful using action verbs and quantifiable results: "${currentValue}"`;
        const suggestion = await generateContentSuggestion(prompt);
        handleArrayChange(index, 'description', suggestion);
    };

    return (
        <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 border rounded-md space-y-4 bg-gray-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Job Title" value={exp.title} onChange={e => handleArrayChange(index, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        <input type="text" placeholder="Company" value={exp.company} onChange={e => handleArrayChange(index, 'company', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        <input type="text" placeholder="Start Date" value={exp.startDate} onChange={e => handleArrayChange(index, 'startDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        <input type="text" placeholder="End Date" value={exp.endDate} onChange={e => handleArrayChange(index, 'endDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                    </div>
                    <div>
                        <textarea placeholder="Description" value={exp.description} onChange={e => handleArrayChange(index, 'description', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"/>
                        <button onClick={() => handleDescriptionAssist(index, exp.description)} className="mt-2 text-sm bg-blue-100 text-primary px-3 py-1 rounded-md hover:bg-blue-200 flex items-center gap-1"><SparklesIcon /> AI Assist</button>
                    </div>
                    <button onClick={() => removeExperience(exp.id)} className="text-red-500 hover:text-red-700 font-semibold flex items-center justify-center gap-1 text-sm"><TrashIcon /> Remove Experience</button>
                </div>
            ))}
            <button onClick={addExperience} className="text-primary font-semibold flex items-center gap-1"><PlusIcon /> Add Experience</button>
        </div>
    );
};

export default ExperienceForm;
