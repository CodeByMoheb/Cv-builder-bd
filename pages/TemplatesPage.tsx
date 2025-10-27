import React from 'react';
import { Template } from '../types';
import { TEMPLATE_CATEGORIES, INITIAL_RESUME_DATA } from '../constants';

interface TemplatesPageProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplatesPage: React.FC<TemplatesPageProps> = ({ onSelectTemplate }) => {
  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Choose Your Template</h1>
        <p className="mt-2 text-lg text-gray-600">Select a professionally designed, ATS-friendly template to get started.</p>
      </div>
      {TEMPLATE_CATEGORIES.map((category) => (
        <div key={category.name}>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
            {category.templates.map((template) => {
              const TemplatePreviewComponent = template.component;
              return (
                <div
                  key={template.id}
                  className="group cursor-pointer"
                  onClick={() => onSelectTemplate(template)}
                >
                  <div className="aspect-[1/1.414] bg-gray-200 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                    {/* Live preview of the template, scaled down to fit the card */}
                    <div className="pointer-events-none transform-gpu scale-[0.28] origin-top-left">
                        <div className="w-[595pt] h-[842pt] bg-white">
                            <TemplatePreviewComponent resumeData={INITIAL_RESUME_DATA} />
                        </div>
                    </div>
                  </div>
                  <p className="mt-2 text-center text-gray-600 font-medium group-hover:text-primary">{template.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplatesPage;