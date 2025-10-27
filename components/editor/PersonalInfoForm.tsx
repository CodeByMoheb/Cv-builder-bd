import React, { useState } from 'react';
import { ResumeData } from '../../types';
import { SparklesIcon, UserCircleIcon, PencilIcon } from '../ui/Icons';
import { generateContentSuggestion, editProfileImage } from '../../services/geminiService';
import { Modal } from '../ui/Modal';

interface FormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

// Helper to convert file to base64
const fileToBase64 = (file: File): Promise<{base64: string, mimeType: string}> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            // The result includes the mime type header, e.g., "data:image/jpeg;base64,"
            // We need to pass the full string to the img src, but only the base64 part to the API
            const base64Content = result.split(',')[1];
            const mimeType = result.substring(result.indexOf(':') + 1, result.indexOf(';'));
            resolve({ base64: base64Content, mimeType });
        };
        reader.onerror = error => reject(error);
    });
};

const PersonalInfoForm: React.FC<FormProps> = ({ resumeData, setResumeData }) => {
    const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);
    const [imageEditPrompt, setImageEditPrompt] = useState('');
    const [isImageEditing, setIsImageEditing] = useState(false);
    const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
    const [aiSummary, setAiSummary] = useState('');
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [name]: value },
        }));
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const { base64, mimeType } = await fileToBase64(file);
            setResumeData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, photo: `data:${mimeType};base64,${base64}` },
            }));
        }
    };

    const handleImageEdit = async () => {
        if (!resumeData.personalInfo.photo || !imageEditPrompt) return;
        
        setIsImageEditing(true);
        try {
            const fullBase64String = resumeData.personalInfo.photo;
            const mimeType = fullBase64String.substring(fullBase64String.indexOf(':') + 1, fullBase64String.indexOf(';'));
            const base64Data = fullBase64String.split(',')[1];

            const editedBase64 = await editProfileImage(base64Data, mimeType, imageEditPrompt);

            setResumeData(prev => ({
                ...prev,
                personalInfo: { ...prev.personalInfo, photo: `data:${mimeType};base64,${editedBase64}` },
            }));
            setIsImageEditorOpen(false);
            setImageEditPrompt('');
        } catch (error) {
            console.error(error);
            alert("Failed to edit image.");
        } finally {
            setIsImageEditing(false);
        }
    };

    const handleSummaryAssist = async () => {
        setIsSummaryLoading(true);
        setIsSummaryModalOpen(true);
        setAiSummary('Generating...');
        const prompt = `Based on this resume data, write a compelling professional summary. Current summary for context: "${resumeData.personalInfo.summary}"`;
        const suggestion = await generateContentSuggestion(prompt);
        setAiSummary(suggestion);
        setIsSummaryLoading(false);
    };

    return (
        <div className="space-y-6">
            <Modal isOpen={isSummaryModalOpen} onClose={() => setIsSummaryModalOpen(false)} title="AI Summary Suggestion">
                 <div className="whitespace-pre-wrap font-mono text-sm bg-gray-100 p-4 rounded-md overflow-auto max-h-96">{aiSummary}</div>
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
                    <button onClick={handleImageEdit} disabled={isImageEditing} className="bg-primary text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:bg-gray-400">
                        {isImageEditing ? 'Editing...' : <><SparklesIcon /> Generate</>}
                    </button>
                </div>
            </Modal>

            <div className="flex items-center gap-4 flex-wrap">
                {resumeData.personalInfo.photo ? (
                     <img src={resumeData.personalInfo.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                    <UserCircleIcon className="w-24 h-24 text-gray-300" />
                )}
                <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Profile Photo
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"/>
                    </label>
                    {resumeData.personalInfo.photo && (
                        <button onClick={() => setIsImageEditorOpen(true)} className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 flex items-center gap-1 w-fit"><PencilIcon className="w-4 h-4" /> Edit with AI</button>
                    )}
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="name" placeholder="Name" value={resumeData.personalInfo.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                <input type="text" name="title" placeholder="Title" value={resumeData.personalInfo.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                <input type="email" name="email" placeholder="Email" value={resumeData.personalInfo.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                <input type="tel" name="phone" placeholder="Phone" value={resumeData.personalInfo.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                <input type="text" name="location" placeholder="Location" value={resumeData.personalInfo.location} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
                <input type="text" name="linkedin" placeholder="LinkedIn Profile" value={resumeData.personalInfo.linkedin} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md"/>
            </div>
             <div>
                <textarea name="summary" placeholder="Professional Summary" value={resumeData.personalInfo.summary} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md h-32"/>
                <button onClick={handleSummaryAssist} className="mt-2 text-sm bg-blue-100 text-primary px-3 py-1 rounded-md hover:bg-blue-200 flex items-center gap-1"><SparklesIcon /> AI Assist</button>
            </div>
        </div>
    );
};

export default PersonalInfoForm;
