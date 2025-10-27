
import React, { useState, useCallback } from 'react';
import { ResumeData, Experience, Education, Skill, Project } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { SparklesIcon, TrashIcon, PlusIcon, UserCircleIcon, PencilIcon } from './ui/Icons';
import { analyzeResume, generateContentSuggestion, editProfileImage } from '../services/geminiService';
import { Modal } from './ui/Modal';

// Helper to convert file to base64
const fileToBase64 = (file: File): Promise<{base64: string, mimeType: string}> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const [mimeType, base64] = result.split(',');
            resolve({ base64, mimeType });
        };
        reader.onerror = error => reject(error);
    });
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-white rounded-lg shadow-md mb-4 transition-all duration-300">
      <h3
        className="text-lg font-semibold p-4 border-b border-gray-200 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </h3>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

interface ResumeEditorProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const ResumeEditor: React.FC<ResumeEditorProps> = ({ resumeData, setResumeData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [aiContent, setAiContent] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');

    const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
    const [imageEditPrompt, setImageEditPrompt] = useState('');
    const [isImageEditing, setIsImageEditing] = useState(false);
    
    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [name]: value },
        }));
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const { base64 } = await fileToBase64(file);
            setResumeData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, photo: base64 },
            }));
        }
    };

    const handleImageEdit = async () => {
        if (!resumeData.personalInfo.photo || !imageEditPrompt) return;
        
        setIsImageEditing(true);
        try {
            const originalMimeType = `image/${resumeData.personalInfo.photo.substring(5, resumeData.personalInfo.photo.indexOf(';'))}`
            const originalBase64 = resumeData.personalInfo.photo.split(',')[1] || resumeData.personalInfo.photo;
            const editedBase64 = await editProfileImage(originalBase64, originalMimeType, imageEditPrompt);
            setResumeData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, photo: `data:${originalMimeType};base64,${editedBase64}` },
            }));
            setIsImageEditorOpen(false);
            setImageEditPrompt('');
        } catch (error) {
            console.error(error);
            alert("Failed to edit image.");
        } finally {
            setIsImageEditing(false);
        }
    }


    // Fix: Replaced the generic function with a more strongly typed one to correctly
    // infer types for resume data arrays, resolving multiple TypeScript errors.
    const handleArrayChange = <
      K extends Exclude<keyof ResumeData, 'personalInfo'>
    >(
        key: K,
        index: number,
        field: keyof ResumeData[K][number],
        value: string
    ) => {
        setResumeData(prev => {
            const newArray = [...prev[key]];
            const item = newArray[index];
            newArray[index] = { ...item, [field]: value };
            return { ...prev, [key]: newArray };
        });
    };

    const addArrayItem = <T,>(key: keyof ResumeData, newItem: T) => {
        setResumeData(prev => ({
            ...prev,
            [key]: [...(prev[key] as T[]), newItem],
        }));
    };

    const removeArrayItem = (key: keyof ResumeData, id: string) => {
        setResumeData(prev => ({
            ...prev,
            [key]: (prev[key] as any[]).filter(item => item.id !== id),
        }));
    };
    
    const handleAIAssist = useCallback(async (field: keyof typeof resumeData.personalInfo | `experience.${number}.description`, currentValue: string) => {
        setIsLoading(true);
        setModalTitle(`AI Suggestion for ${typeof field === 'string' ? field : 'Description'}`);
        setIsModalOpen(true);
        setAiContent('Generating...');
        
        let prompt;
        if(field === 'summary') {
            prompt = `Based on this resume, write a compelling professional summary. Current summary for context: "${currentValue}"`;
        } else {
            prompt = `Rewrite this job description point to be more impactful using action verbs and quantifiable results: "${currentValue}"`;
        }

        const suggestion = await generateContentSuggestion(prompt);
        setAiContent(suggestion);
        setIsLoading(false);
    }, []);

    const handleAIReview = useCallback(async () => {
        setIsLoading(true);
        setModalTitle('AI Resume Analysis');
        setIsModalOpen(true);
        setAiContent('Analyzing your resume with Gemini Pro...');
        const analysis = await analyzeResume(resumeData);
        setAiContent(analysis);
        setIsLoading(false);
    }, [resumeData]);


  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-inner h-full overflow-y-auto" style={{maxHeight: 'calc(100vh - 120px)'}}>
       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalTitle}>
            <div className="whitespace-pre-wrap font-mono text-sm bg-gray-100 p-4 rounded-md overflow-auto max-h-96" dangerouslySetInnerHTML={{ __html: aiContent.replace(/\n/g, '<br />') }}></div>
       </Modal>
       <Modal isOpen={isImageEditorOpen} onClose={() => setIsImageEditorOpen(false)} title="Edit Photo with AI">
            <div className="flex flex-col gap-4">
                <p>Enter a prompt to edit your photo, e.g., "make the background a solid blue color" or "give me a more professional look".</p>
                <input 
                    type="text"
                    value={imageEditPrompt}
                    onChange={(e) => setImageEditPrompt(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., remove the background"
                />
                <button
                    onClick={handleImageEdit}
                    disabled={isImageEditing}
                    className="bg-primary text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-gray-400"
                >
                    {isImageEditing ? 'Editing...' : <><SparklesIcon /> Generate</>}
                </button>
            </div>
       </Modal>

        <button onClick={handleAIReview} className="w-full mb-4 bg-green-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors duration-200">
            <SparklesIcon /> Review with AI (Thinking Mode)
        </button>

      <Section title="Personal Info">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2 flex items-center gap-4">
                {resumeData.personalInfo.photo ? (
                     <img src={`data:image/png;base64,${resumeData.personalInfo.photo}`} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                    <UserCircleIcon className="w-24 h-24 text-gray-300" />
                )}
                <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Profile Photo
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"/>
                    </label>
                    {resumeData.personalInfo.photo && (
                        <button onClick={() => setIsImageEditorOpen(true)} className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 flex items-center gap-1"><PencilIcon className="w-4 h-4" /> Edit with AI</button>
                    )}
                </div>
            </div>
          <input type="text" name="name" placeholder="Name" value={resumeData.personalInfo.name} onChange={handlePersonalInfoChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
          <input type="text" name="title" placeholder="Title" value={resumeData.personalInfo.title} onChange={handlePersonalInfoChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
          <input type="email" name="email" placeholder="Email" value={resumeData.personalInfo.email} onChange={handlePersonalInfoChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
          <input type="tel" name="phone" placeholder="Phone" value={resumeData.personalInfo.phone} onChange={handlePersonalInfoChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
          <input type="text" name="location" placeholder="Location" value={resumeData.personalInfo.location} onChange={handlePersonalInfoChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
          <input type="text" name="linkedin" placeholder="LinkedIn Profile" value={resumeData.personalInfo.linkedin} onChange={handlePersonalInfoChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
           <div className="col-span-1 md:col-span-2">
                <textarea name="summary" placeholder="Professional Summary" value={resumeData.personalInfo.summary} onChange={handlePersonalInfoChange} className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"/>
                <button onClick={() => handleAIAssist('summary', resumeData.personalInfo.summary)} className="mt-2 text-sm bg-blue-100 text-primary px-3 py-1 rounded-md hover:bg-blue-200 flex items-center gap-1"><SparklesIcon /> AI Assist</button>
            </div>
        </div>
      </Section>

      <Section title="Experience">
        {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 border rounded-md">
                <input type="text" placeholder="Job Title" value={exp.title} onChange={e => handleArrayChange('experience', index, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                <input type="text" placeholder="Company" value={exp.company} onChange={e => handleArrayChange('experience', index, 'company', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                <input type="text" placeholder="Start Date" value={exp.startDate} onChange={e => handleArrayChange('experience', index, 'startDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                <input type="text" placeholder="End Date" value={exp.endDate} onChange={e => handleArrayChange('experience', index, 'endDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                <div className="col-span-1 md:col-span-2">
                    <textarea placeholder="Description" value={exp.description} onChange={e => handleArrayChange('experience', index, 'description', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md h-24"/>
                    <button onClick={() => handleAIAssist(`experience.${index}.description`, exp.description)} className="mt-2 text-sm bg-blue-100 text-primary px-3 py-1 rounded-md hover:bg-blue-200 flex items-center gap-1"><SparklesIcon /> AI Assist</button>
                </div>
                <button onClick={() => removeArrayItem('experience', exp.id)} className="col-span-1 md:col-span-2 text-red-500 hover:text-red-700 font-semibold flex items-center justify-center gap-1"><TrashIcon /> Remove</button>
            </div>
        ))}
        <button onClick={() => addArrayItem('experience', {id: uuidv4(), title: '', company: '', location: '', startDate: '', endDate: '', description: ''})} className="text-primary font-semibold flex items-center gap-1"><PlusIcon /> Add Experience</button>
      </Section>
      
      {/* Other sections like Education, Skills, etc. follow a similar pattern */}
    </div>
  );
};

export default ResumeEditor;
