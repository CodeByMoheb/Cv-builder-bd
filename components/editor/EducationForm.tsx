// FIX: Created the content for the missing EducationForm.tsx file.
import React from 'react';
import { ResumeData, Education } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { TrashIcon, PlusIcon } from '../ui/Icons';

interface EducationFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const EducationForm: React.FC<EducationFormProps> = ({ resumeData, setResumeData }) => {

  const handleChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [name]: value } : edu),
    }));
  };
  
  const addEducation = () => {
    const newEdu: Education = {
      id: uuidv4(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
    };
    setResumeData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {resumeData.education.map((edu) => (
        <div key={edu.id} className="p-4 border rounded-lg space-y-3 bg-gray-50/50 relative">
          <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
            <TrashIcon />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input type="text" name="institution" placeholder="Institution" value={edu.institution} onChange={e => handleChange(edu.id, e)} className="input" />
            <input type="text" name="degree" placeholder="Degree (e.g., Bachelor of Science)" value={edu.degree} onChange={e => handleChange(edu.id, e)} className="input" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input type="text" name="fieldOfStudy" placeholder="Field of Study (e.g., Computer Science)" value={edu.fieldOfStudy} onChange={e => handleChange(edu.id, e)} className="input md:col-span-1" />
            <input type="text" name="startDate" placeholder="Start Date" value={edu.startDate} onChange={e => handleChange(edu.id, e)} className="input" />
            <input type="text" name="endDate" placeholder="End Date" value={edu.endDate} onChange={e => handleChange(edu.id, e)} className="input" />
          </div>
        </div>
      ))}
      <button onClick={addEducation} className="w-full border-2 border-dashed border-gray-300 hover:border-primary text-gray-500 hover:text-primary font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2">
        <PlusIcon />
        Add Education
      </button>
    </div>
  );
};

export default EducationForm;
