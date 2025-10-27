import React from 'react';
import { ResumeData } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { TrashIcon, PlusIcon } from '../ui/Icons';

interface FormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const EducationForm: React.FC<FormProps> = ({ resumeData, setResumeData }) => {

    const handleArrayChange = (index: number, field: string, value: string) => {
        setResumeData(prev => {
            const newEducation = [...prev.education];
            newEducation[index] = { ...newEducation[index], [field]: value };
            return { ...prev, education: newEducation };
        });
    };

    const addEducation = () => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, {id: uuidv4(), institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: ''}],
        }));
    };

    const removeEducation = (id: string) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter(item => item.id !== id),
        }));
    };

    return (
        <div className="space-y-6">
            {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="p-4 border rounded-md space-y-4 bg-gray-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Institution" value={edu.institution} onChange={e => handleArrayChange(index, 'institution', e.target.value)} className="md:col-span-2 w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        <input type="text" placeholder="Degree" value={edu.degree} onChange={e => handleArrayChange(index, 'degree', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        <input type="text" placeholder="Field of Study" value={edu.fieldOfStudy} onChange={e => handleArrayChange(index, 'fieldOfStudy', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        <input type="text" placeholder="Start Date" value={edu.startDate} onChange={e => handleArrayChange(index, 'startDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                        <input type="text" placeholder="End Date" value={edu.endDate} onChange={e => handleArrayChange(index, 'endDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                    </div>
                    <button onClick={() => removeEducation(edu.id)} className="text-red-500 hover:text-red-700 font-semibold flex items-center justify-center gap-1 text-sm"><TrashIcon /> Remove Education</button>
                </div>
            ))}
            <button onClick={addEducation} className="text-primary font-semibold flex items-center gap-1"><PlusIcon /> Add Education</button>
        </div>
    );
};

export default EducationForm;
