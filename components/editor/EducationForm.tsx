// FIX: Created the content for the missing EducationForm.tsx file.
import React from 'react';
import { ResumeData, Education } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { TrashIcon, PlusIcon, AcademicCapIcon } from '../ui/Icons';

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
      {resumeData.education.length === 0 ? (
        <div className="text-center py-12 px-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <AcademicCapIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Add Your Education</h3>
            <p className="mt-1 text-sm text-gray-500">
                List your degrees and academic achievements. Click below to add an entry.
            </p>
        </div>
      ) : (
        resumeData.education.map((edu, index) => (
          <div key={edu.id} className="p-4 border rounded-lg space-y-4 relative">
            <div className="flex justify-between items-center">
               <h3 className="font-semibold text-gray-800">Education #{index + 1}</h3>
               <button onClick={() => removeEducation(edu.id)} className="text-gray-400 hover:text-red-500">
                  <TrashIcon />
               </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`institution-${edu.id}`} className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                <input type="text" id={`institution-${edu.id}`} name="institution" placeholder="e.g., Stanford University" value={edu.institution} onChange={e => handleChange(edu.id, e)} className="input" />
              </div>
              <div>
                <label htmlFor={`degree-${edu.id}`} className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                <input type="text" id={`degree-${edu.id}`} name="degree" placeholder="e.g., Master of Science" value={edu.degree} onChange={e => handleChange(edu.id, e)} className="input" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label htmlFor={`fieldOfStudy-${edu.id}`} className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                <input type="text" id={`fieldOfStudy-${edu.id}`} name="fieldOfStudy" placeholder="e.g., Computer Science" value={edu.fieldOfStudy} onChange={e => handleChange(edu.id, e)} className="input" />
              </div>
              <div>
                <label htmlFor={`startDate-${edu.id}`} className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="text" id={`startDate-${edu.id}`} name="startDate" placeholder="e.g., Sep 2014" value={edu.startDate} onChange={e => handleChange(edu.id, e)} className="input" />
              </div>
              <div>
                <label htmlFor={`endDate-${edu.id}`} className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input type="text" id={`endDate-${edu.id}`} name="endDate" placeholder="e.g., May 2016" value={edu.endDate} onChange={e => handleChange(edu.id, e)} className="input" />
              </div>
            </div>
          </div>
        ))
      )}
      <button onClick={addEducation} className="w-full border-2 border-dashed border-gray-300 hover:border-primary text-gray-500 hover:text-primary font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2">
        <PlusIcon />
        Add Education
      </button>
    </div>
  );
};

export default EducationForm;