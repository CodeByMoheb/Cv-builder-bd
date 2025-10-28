import React from 'react';
import { CheckIcon } from '../ui/Icons';

interface EditorStepperProps {
    steps: string[];
    currentStep: number;
    visitedSteps: Set<number>;
    onStepClick: (stepIndex: number) => void;
}

const EditorStepper: React.FC<EditorStepperProps> = ({ steps, currentStep, visitedSteps, onStepClick }) => {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-start">
                {steps.map((stepName, stepIdx) => {
                    const isCompleted = visitedSteps.has(stepIdx) && currentStep !== stepIdx;
                    const isActive = currentStep === stepIdx;

                    return (
                        <li key={stepName} className="relative flex-1">
                            {/* Connecting line */}
                            {stepIdx > 0 && (
                                <div className="absolute inset-0 right-1/2 flex items-center mt-4" aria-hidden="true">
                                    <div className={`h-0.5 w-full transition-colors duration-300 ${isCompleted || isActive ? 'bg-primary' : 'bg-gray-300'}`}></div>
                                </div>
                            )}

                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onStepClick(stepIdx);
                                }}
                                className="relative flex flex-col items-center justify-center gap-2 group"
                                aria-current={isActive ? 'step' : undefined}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                    ${isActive ? 'bg-primary ring-4 ring-primary/20' : isCompleted ? 'bg-primary' : 'bg-gray-300 group-hover:bg-gray-400'}
                                `}>
                                    {isCompleted ? (
                                        <CheckIcon className="w-5 h-5 text-white" />
                                    ) : (
                                        <span className={`font-bold transition-colors ${isActive ? 'text-white' : 'text-gray-600'}`}>
                                            {stepIdx + 1}
                                        </span>
                                    )}
                                </div>
                                <span className={`text-xs sm:text-sm text-center font-medium transition-colors duration-300
                                    ${isActive ? 'text-primary' : 'text-gray-500'}
                                `}>
                                    {stepName}
                                </span>
                            </a>
                        </li>
                    )
                })}
            </ol>
        </nav>
    );
};

export default EditorStepper;