// FIX: Created the content for the missing ExperienceForm.tsx file.
import React from 'react';
import { ResumeData, Experience } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { generateContentSuggestion } from '../../services/geminiService';
import { SparklesIcon, TrashIcon, PlusIcon } from '../ui/Icons';

interface ExperienceFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ resumeData, setResumeData }) => {

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [name]: value } : exp),
    }));
  };
  
  const addExperience = () => {
    const newExp: Experience = {
      id: uuidv4(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    setResumeData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
  };

  const generateDescription = async (id: string) => {
    const currentExp = resumeData.experience.find(exp => exp.id === id);
    if (!currentExp) return;

    const prompt = `Write 3-4 concise, action-oriented bullet points for a resume, for the role of "${currentExp.title}" at "${currentExp.company}". Use the STAR method (Situation, Task, Action, Result) if possible and include quantifiable achievements. Start each bullet point with a hyphen.`;
    const suggestion = await generateContentSuggestion(prompt);

    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, description: suggestion } : exp),
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {resumeData.experience.map((exp) => (
        <div key={exp.id} className="p-4 border rounded-lg space-y-3 bg-gray-50/50 relative">
          <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
            <TrashIcon />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input type="text" name="title" placeholder="Job Title" value={exp.title} onChange={e => handleChange(exp.id, e)} className="input" />
            <input type="text" name="company" placeholder="Company" value={exp.company} onChange={e => handleChange(exp.id, e)} className="input" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input type="text" name="location" placeholder="Location" value={exp.location} onChange={e => handleChange(exp.id, e)} className="input" />
            <input type="text" name="startDate" placeholder="Start Date (e.g., Jan 2020)" value={exp.startDate} onChange={e => handleChange(exp.id, e)} className="input" />
            <input type="text" name="endDate" placeholder="End Date (e.g., Present)" value={exp.endDate} onChange={e => handleChange(exp.id, e)} className="input" />
          </div>
          <div className="relative">
            <textarea
              name="description"
              placeholder="Describe your responsibilities and achievements. Use bullet points starting with a hyphen (-)."
              value={exp.description}
              onChange={e => handleChange(exp.id, e)}
              className="input h-24 resize-none"
            />
            <button onClick={() => generateDescription(exp.id)} className="absolute bottom-2 right-2 bg-primary/20 text-primary hover:bg-primary/30 text-xs font-bold py-1 px-2 rounded-md flex items-center gap-1">
              <SparklesIcon className="w-4 h-4" />
              AI Suggestion
            </button>
          </div>
        </div>
      ))}
      <button onClick={addExperience} className="w-full border-2 border-dashed border-gray-300 hover:border-primary text-gray-500 hover:text-primary font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2">
        <PlusIcon />
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;
