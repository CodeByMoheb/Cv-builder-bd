import React from 'react';
import { CheckCircleIcon } from '../ui/Icons';

interface EditorStepperProps {
    steps: string[];
    currentStep: number;
    visitedSteps: Set<number>;
    onStepClick: (stepIndex: number) => void;
}

const EditorStepper: React.FC<EditorStepperProps> = ({ steps, currentStep, visitedSteps, onStepClick }) => {
    return (
        <nav aria-label="Progress">
            <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
                {steps.map((stepName, stepIdx) => {
                    const isCompleted = visitedSteps.has(stepIdx) && currentStep !== stepIdx;
                    const isActive = currentStep === stepIdx;

                    return (
                        <li key={stepName} className="md:flex-1">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onStepClick(stepIdx);
                                }}
                                className={`group flex flex-col border-l-4 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0 ${
                                    isActive
                                        ? 'border-primary'
                                        : isCompleted
                                        ? 'border-green-600 hover:border-green-800'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                                aria-current={isActive ? 'step' : undefined}
                            >
                                <span className={`text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'text-primary'
                                        : isCompleted
                                        ? 'text-green-600 group-hover:text-green-800'
                                        : 'text-gray-500 group-hover:text-gray-700'
                                }`}>
                                    Step {stepIdx + 1}
                                </span>
                                <span className="text-sm font-medium flex items-center">
                                    {stepName}
                                    {isCompleted && <CheckCircleIcon className="w-5 h-5 ml-2 text-green-600" />}
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
