

import React from 'react';
import { Template, TemplateCategory } from '../types';
import { INITIAL_RESUME_DATA } from '../constants';

interface TemplateSelectorProps {
  categories: TemplateCategory[];
  onSelectTemplate: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ categories, onSelectTemplate }) => {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Choose Your Template</h1>
        <p className="mt-2 text-lg text-gray-600">Select a professionally designed, ATS-friendly template to get started.</p>
      </div>
      {categories.map((category) => (
        <div key={category.name}>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{category.name}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {category.templates.map((template) => {
              // Fix: Render a live preview of the template component instead of using a non-existent `imageUrl`.
              const TemplatePreviewComponent = template.component;
              return (
                <div
                  key={template.id}
                  className="group cursor-pointer"
                  onClick={() => onSelectTemplate(template)}
                >
                  <div className="aspect-[1/1.414] bg-gray-200 rounded-lg shadow-md overflow-hidden transform transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
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

export default TemplateSelector;