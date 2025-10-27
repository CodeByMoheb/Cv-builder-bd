import React, { useState, useRef } from 'react';
import { ResumeData } from '../../types';
import { generateContentSuggestion, editProfileImage } from '../../services/geminiService';
import { SparklesIcon, PencilIcon } from '../ui/Icons';
import { Modal } from '../ui/Modal';

interface PersonalInfoFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ resumeData, setResumeData }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const personalInfo = resumeData.personalInfo;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setResumeData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, photo: event.target?.result as string },
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const generateSummary = async () => {
    setIsGenerating(true);
    
    // Gather more context from the resume data for a better prompt
    const recentExperience = resumeData.experience
      .slice(0, 2) // Get the 2 most recent jobs for brevity
      .map(job => `${job.title} at ${job.company}`)
      .join('; ');

    const allSkills = resumeData.skills.map(skill => skill.name).join(', ');
    const keyProjects = resumeData.projects.slice(0, 2).map(p => p.name).join(', ');

    // Construct a more detailed and effective prompt
    const prompt = `You are an expert career coach and resume writer. 
    Craft a powerful and concise professional summary (2-3 sentences) for a "${personalInfo.title}". 
    Use the following information to make the summary tailored and impactful. Highlight the most relevant skills and experiences for the target title.

    **Candidate Information:**
    - **Target Title:** ${personalInfo.title}
    - **Recent Experience:** ${recentExperience || 'Not specified'}
    - **Core Skills:** ${allSkills || 'Not specified'}
    - **Key Projects:** ${keyProjects || 'Not specified'}

    Generate the summary now.`;

    const suggestion = await generateContentSuggestion(prompt);
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, summary: suggestion },
    }));
    setIsGenerating(false);
  };
  
  const handleImageEdit = async () => {
    if (!personalInfo.photo || !editPrompt) return;
    setIsEditingImage(true);
    
    const [header, base64Data] = personalInfo.photo.split(',');
    const mimeType = header.match(/:(.*?);/)?.[1] || 'image/png';
    
    try {
      const newImageBase64 = await editProfileImage(base64Data, mimeType, editPrompt);
      const newImageDataUrl = `data:${mimeType};base64,${newImageBase64}`;
      setResumeData(prev => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, photo: newImageDataUrl },
      }));
    } catch (error) {
      console.error("Failed to edit image:", error);
      alert("Sorry, the image could not be edited at this time.");
    } finally {
      setIsEditingImage(false);
      setIsEditModalOpen(false);
      setEditPrompt('');
    }
  };


  return (
    <div className="space-y-4 animate-fadeIn">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Full Name" value={personalInfo.name} onChange={handleChange} className="input" />
        <input type="text" name="title" placeholder="Job Title (e.g., Senior Software Engineer)" value={personalInfo.title} onChange={handleChange} className="input" />
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="email" name="email" placeholder="Email Address" value={personalInfo.email} onChange={handleChange} className="input" />
        <input type="tel" name="phone" placeholder="Phone Number" value={personalInfo.phone} onChange={handleChange} className="input" />
      </div>
      <input type="text" name="location" placeholder="Location (e.g., San Francisco, CA)" value={personalInfo.location} onChange={handleChange} className="input" />
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="linkedin" placeholder="LinkedIn Profile URL" value={personalInfo.linkedin} onChange={handleChange} className="input" />
        <input type="text" name="website" placeholder="Personal Website/Portfolio" value={personalInfo.website} onChange={handleChange} className="input" />
      </div>

      <div className="relative">
        <textarea name="summary" placeholder="Professional Summary" value={personalInfo.summary} onChange={handleChange} className="input h-28 resize-none" />
        <button onClick={generateSummary} disabled={isGenerating} className="absolute bottom-2 right-2 bg-primary/20 text-primary hover:bg-primary/30 text-xs font-bold py-1 px-2 rounded-md flex items-center gap-1 disabled:opacity-50">
          <SparklesIcon className="w-4 h-4" />
          {isGenerating ? 'Generating...' : 'AI Suggestion'}
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
        <div className="flex items-center gap-4">
          <img 
            src={personalInfo.photo || 'https://via.placeholder.com/96'} 
            alt="Profile Preview" 
            className="w-24 h-24 rounded-full object-cover bg-gray-200"
          />
          <div className="flex flex-col gap-2">
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm"
            >
                Upload Photo
            </button>
             <input type="file" ref={fileInputRef} onChange={handlePhotoChange} accept="image/*" className="hidden" />
             {personalInfo.photo && (
                 <button
                    type="button"
                    onClick={() => setIsEditModalOpen(true)}
                    className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-semibold py-2 px-4 rounded-md shadow-sm text-sm flex items-center justify-center gap-1"
                 >
                    <PencilIcon className="w-4 h-4" />
                    AI Edit
                 </button>
             )}
          </div>
        </div>
      </div>
      
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Photo with AI">
          <div className="space-y-4">
              <p className="text-sm text-gray-600">Describe the changes you'd like to make to your photo. For example: "remove the background", "make it black and white", or "give me a professional-looking blue background".</p>
              <input 
                type="text"
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                placeholder="e.g., change background to a solid light gray"
                className="input"
              />
              <button
                onClick={handleImageEdit}
                disabled={isEditingImage || !editPrompt}
                className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 disabled:bg-gray-400"
              >
                  {isEditingImage ? 'Editing...' : 'Generate New Image'}
              </button>
          </div>
      </Modal>

    </div>
  );
};

export default PersonalInfoForm;