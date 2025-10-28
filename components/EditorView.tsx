import React, { useState, useRef, useEffect } from 'react';
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

const AUTOSAVE_INTERVAL = 60000; // 60 seconds

const EditorView: React.FC<EditorViewProps> = ({ template, resumeData, setResumeData, onBack, onSave, currentCvId, onGeneratePdf }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const resumeDataRef = useRef(resumeData);

  // Keep a ref to the latest resume data to avoid stale closures in setInterval
  useEffect(() => {
    resumeDataRef.current = resumeData;
  }, [resumeData]);

  const getAutoSaveKey = () => {
    return currentCvId ? `autosave_cv_${currentCvId}` : `autosave_new_${template.id}`;
  };

  // Effect for auto-saving
  useEffect(() => {
    const timer = setInterval(() => {
      const key = getAutoSaveKey();
      localStorage.setItem(key, JSON.stringify(resumeDataRef.current));
      console.log("Auto-saved progress.");
    }, AUTOSAVE_INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, [currentCvId, template.id]);
  
  // Effect for loading auto-saved data on component mount
  useEffect(() => {
    const key = getAutoSaveKey();
    const autoSavedData = localStorage.getItem(key);
    
    if (autoSavedData) {
      if (window.confirm("We found some unsaved changes. Would you like to restore them?")) {
        try {
          const parsedData = JSON.parse(autoSavedData);
          setResumeData(parsedData);
        } catch (e) {
          console.error("Failed to parse auto-saved data:", e);
        }
      }
      // Clean up the auto-saved data after asking the user
      localStorage.removeItem(key);
    }
  }, [currentCvId, template.id, setResumeData]);


  const handleSaveClick = async () => {
    setIsSaving(true);
    const autoSaveKey = getAutoSaveKey();
    try {
      if (!currentCvId) {
        const name = prompt("Please enter a name for your CV:", resumeData.personalInfo.name || "My Resume");
        if (name) {
          await onSave(name);
          alert("CV Saved Successfully!");
          localStorage.removeItem(autoSaveKey); // Clean up on save
        }
      } else {
        await onSave(resumeData.personalInfo.name);
        alert("CV Updated Successfully!");
        localStorage.removeItem(autoSaveKey); // Clean up on save
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