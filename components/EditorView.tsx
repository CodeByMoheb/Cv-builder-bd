import React, { useState, useRef } from 'react';
import { ResumeData, Template } from '../types';
import ResumeEditor from './ResumeEditor';
import ResumePreview from './ResumePreview';
import { ArrowLeftIcon, DownloadIcon, EyeIcon, SaveIcon } from './ui/Icons';
import PaymentModal from './PaymentModal';

interface EditorViewProps {
  template: Template;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  onBack: () => void;
  onSave: (name: string) => Promise<void>;
  currentCvId: string | null;
  onGeneratePdf: () => void;
}

const EditorView: React.FC<EditorViewProps> = ({ template, resumeData, setResumeData, onBack, onSave, currentCvId, onGeneratePdf }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
    
  const handleSaveClick = async () => {
    setIsSaving(true);
    try {
      if (!currentCvId) {
        const name = prompt("Please enter a name for your CV:", resumeData.personalInfo.name || "My Resume");
        if (name) {
          await onSave(name);
          alert("CV Saved Successfully!");
        }
      } else {
        await onSave(resumeData.personalInfo.name);
        alert("CV Updated Successfully!");
      }
    } catch (error) {
        alert("Failed to save CV. Please try again.");
    } finally {
        setIsSaving(false);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setTimeout(onGeneratePdf, 100); 
  };

  return (
    <>
      <div className="bg-secondary px-4 md:px-8 py-3 sticky top-[72px] z-20 border-b">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted hover:text-primary transition-colors duration-200 text-sm font-medium"
            >
              <ArrowLeftIcon />
              Back to Dashboard
            </button>
            <div className="flex items-center gap-3">
               <button
                  onClick={handleSaveClick}
                  disabled={isSaving}
                  className="bg-white border border-gray-300 hover:bg-gray-100 text-dark font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 text-sm disabled:opacity-50"
              >
                  <SaveIcon className="w-5 h-5"/>
                  {isSaving ? 'Saving...' : (currentCvId ? 'Save' : 'Save As')}
              </button>
              <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md text-sm"
              >
                  <DownloadIcon />
                  Download
              </button>
            </div>
          </div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white rounded-lg shadow-lg border">
            <ResumeEditor 
              resumeData={resumeData} 
              setResumeData={setResumeData} 
              template={template} 
            />
          </div>

          <div className="hidden lg:block sticky top-[150px]">
            <ResumePreview 
              template={template} 
              resumeData={resumeData} 
            />
          </div>
        </div>
      </div>
      
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default EditorView;