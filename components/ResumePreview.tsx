import React from 'react';
import { ResumeData, Template } from '../types';

interface ResumePreviewProps {
  template: Template;
  resumeData: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ template, resumeData }) => {
  const TemplateComponent = template.component;
  
  // Define a consistent scale factor for the preview
  const PREVIEW_SCALE = 0.6;

  return (
    <div className="bg-white rounded-lg shadow-lg border flex flex-col overflow-hidden">
      <div className="h-10 bg-gray-100 flex items-center justify-center px-3 border-b">
        <span className="font-semibold text-gray-700 text-sm">{template.name} Preview</span>
      </div>
      <div className="p-4 bg-secondary">
        <div
          className="mx-auto shadow-lg"
          style={{
            transform: `scale(${PREVIEW_SCALE})`,
            transformOrigin: 'top center',
            width: `595pt`,
            height: `842pt`,
          }}
        >
          <div className="bg-white w-full h-full">
            <TemplateComponent resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;