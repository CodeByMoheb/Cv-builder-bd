import React, { useState, useMemo } from 'react';
import { ResumeData } from '../types';
import EditorStepper from './editor/EditorStepper';
import PersonalInfoForm from './editor/PersonalInfoForm';
import ExperienceForm from './editor/ExperienceForm';
import EducationForm from './editor/EducationForm';
import SkillsProjectsLanguagesForm from './editor/SkillsProjectsLanguagesForm';
import { ArrowLeftIcon, SparklesIcon } from './ui/Icons';
import { Modal } from './ui/Modal';
import { analyzeResume } from '../services/geminiService';

interface ResumeEditorProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const steps = ['Personal Info', 'Experience', 'Education', 'Skills & More'];

const ResumeEditor: React.FC<ResumeEditorProps> = (props) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [visitedSteps, setVisitedSteps] = useState(new Set([0]));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [aiContent, setAiContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            setVisitedSteps(prev => new Set(prev).add(nextStep));
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleStepClick = (stepIndex: number) => {
        setCurrentStep(stepIndex);
        setVisitedSteps(prev => new Set(prev).add(stepIndex));
    };

    const handleAIReview = async () => {
        setIsLoading(true);
        setIsModalOpen(true);
        setAiContent('Analyzing your resume with Gemini Pro...');
        const analysis = await analyzeResume(props.resumeData);
        setAiContent(analysis);
        setIsLoading(false);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <PersonalInfoForm {...props} />;
            case 1:
                return <ExperienceForm {...props} />;
            case 2:
                return <EducationForm {...props} />;
            case 3:
                return <SkillsProjectsLanguagesForm {...props} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-full">
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="AI Resume Analysis">
                 <div className="whitespace-pre-wrap font-mono text-sm bg-gray-100 p-4 rounded-md overflow-auto max-h-96" dangerouslySetInnerHTML={{ __html: aiContent.replace(/\n/g, '<br />') }}></div>
            </Modal>
            <div className="p-4 border-b">
                <EditorStepper 
                    steps={steps} 
                    currentStep={currentStep} 
                    onStepClick={handleStepClick}
                    visitedSteps={visitedSteps}
                />
            </div>
            <div className="p-4 sm:p-6 flex-grow overflow-y-auto">
                {renderStepContent()}
            </div>
            <div className="p-4 border-t flex justify-between items-center bg-gray-50/50">
                <button 
                    onClick={handleBack} 
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary disabled:text-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    <ArrowLeftIcon className="w-4 h-4" /> Previous
                </button>
                
                {currentStep === steps.length - 1 ? (
                    <button 
                        onClick={handleAIReview} 
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors duration-200"
                    >
                       <SparklesIcon /> Review with AI
                    </button>
                ) : (
                    <button 
                        onClick={handleNext} 
                        className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200"
                    >
                       Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default ResumeEditor;
