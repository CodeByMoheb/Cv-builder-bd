// FIX: Created the content for the missing ResumeEditor.tsx file.
import React, { useState } from 'react';
import { ResumeData } from '../types';
import EditorStepper from './editor/EditorStepper';
import PersonalInfoForm from './editor/PersonalInfoForm';
import ExperienceForm from './editor/ExperienceForm';
import EducationForm from './editor/EducationForm';
import SkillsProjectsLanguagesForm from './editor/SkillsProjectsLanguagesForm';
import { analyzeResume } from '../services/geminiService';
import { SparklesIcon } from './ui/Icons';
import { Modal } from './ui/Modal';
import { marked } from 'marked';

interface ResumeEditorProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const STEPS = ['Personal Info', 'Experience', 'Education', 'Skills & More'];

const ResumeEditor: React.FC<ResumeEditorProps> = ({ resumeData, setResumeData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState(new Set<number>([0]));
  const [analysisResult, setAnalysisResult] = useState('');
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStepClick = (stepIndex: number) => {
    setVisitedSteps(prev => new Set(prev).add(currentStep));
    setCurrentStep(stepIndex);
  };

  const handleNext = () => {
    setVisitedSteps(prev => new Set(prev).add(currentStep));
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleAnalyzeResume = async () => {
    setIsAnalysisLoading(true);
    setIsModalOpen(true);
    const result = await analyzeResume(resumeData);
    const htmlResult = await marked.parse(result);
    setAnalysisResult(htmlResult);
    setIsAnalysisLoading(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 1:
        return <ExperienceForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 2:
        return <EducationForm resumeData={resumeData} setResumeData={setResumeData} />;
      case 3:
        return <SkillsProjectsLanguagesForm resumeData={resumeData} setResumeData={setResumeData} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="mb-8">
        <EditorStepper
          steps={STEPS}
          currentStep={currentStep}
          visitedSteps={visitedSteps}
          onStepClick={handleStepClick}
        />
      </div>

      <div className="min-h-[400px]">
        {renderStepContent()}
      </div>

      <div className="mt-8 pt-4 border-t flex justify-between items-center">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        
        <button
          onClick={handleAnalyzeResume}
          disabled={isAnalysisLoading}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200 disabled:bg-purple-400"
        >
          <SparklesIcon className="w-5 h-5" />
          {isAnalysisLoading ? 'Analyzing...' : 'AI Resume Analysis'}
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === STEPS.length - 1}
          className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="AI Resume Analysis">
        {isAnalysisLoading ? (
            <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        ) : (
            <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: analysisResult }}
            />
        )}
      </Modal>

    </div>
  );
};

export default ResumeEditor;
