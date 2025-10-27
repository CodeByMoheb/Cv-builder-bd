
import React from 'react';
import { Template } from '../types';
import { TEMPLATE_CATEGORIES } from '../constants';

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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {category.templates.map((template) => (
              <div
                key={template.id}
                className="group cursor-pointer"
                onClick={() => onSelectTemplate(template)}
              >
                <div className="aspect-[1/1.414] bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                  <img
                    src={template.imageUrl}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-2 text-center text-gray-600 font-medium group-hover:text-primary">{template.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplatesPage;
