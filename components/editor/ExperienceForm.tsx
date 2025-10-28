// FIX: Created the content for the missing ExperienceForm.tsx file.
import React from 'react';
import { ResumeData, Experience } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { generateContentSuggestion } from '../../services/geminiService';
import { SparklesIcon, TrashIcon, PlusIcon, BriefcaseIcon } from '../ui/Icons';

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
      {resumeData.experience.length === 0 ? (
        <div className="text-center py-12 px-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <BriefcaseIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Add Your Work Experience</h3>
            <p className="mt-1 text-sm text-gray-500">
                Start by adding your most recent job. Click the button below to begin.
            </p>
        </div>
      ) : (
        resumeData.experience.map((exp, index) => (
          <div key={exp.id} className="p-4 border rounded-lg space-y-4 relative">
            <div className="flex justify-between items-center">
               <h3 className="font-semibold text-gray-800">Experience #{index + 1}</h3>
               <button onClick={() => removeExperience(exp.id)} className="text-gray-400 hover:text-red-500">
                  <TrashIcon />
               </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`title-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input type="text" id={`title-${exp.id}`} name="title" placeholder="e.g., Software Engineer" value={exp.title} onChange={e => handleChange(exp.id, e)} className="input" />
              </div>
              <div>
                <label htmlFor={`company-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input type="text" id={`company-${exp.id}`} name="company" placeholder="e.g., Innovate Solutions Inc." value={exp.company} onChange={e => handleChange(exp.id, e)} className="input" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                  <label htmlFor={`location-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" id={`location-${exp.id}`} name="location" placeholder="e.g., San Francisco, CA" value={exp.location} onChange={e => handleChange(exp.id, e)} className="input" />
              </div>
              <div>
                  <label htmlFor={`startDate-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input type="text" id={`startDate-${exp.id}`} name="startDate" placeholder="e.g., Jan 2020" value={exp.startDate} onChange={e => handleChange(exp.id, e)} className="input" />
              </div>
              <div>
                  <label htmlFor={`endDate-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input type="text" id={`endDate-${exp.id}`} name="endDate" placeholder="e.g., Present" value={exp.endDate} onChange={e => handleChange(exp.id, e)} className="input" />
              </div>
            </div>
            <div className="relative">
              <label htmlFor={`description-${exp.id}`} className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                id={`description-${exp.id}`}
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
        ))
      )}
      <button onClick={addExperience} className="w-full border-2 border-dashed border-gray-300 hover:border-primary text-gray-500 hover:text-primary font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2">
        <PlusIcon />
        Add Experience
      </button>
    </div>
  );
};

export default ExperienceForm;