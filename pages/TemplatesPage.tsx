
import React from 'react';
import { Template } from '../types';
import TemplateSelector from '../components/TemplateSelector';
import { TEMPLATE_CATEGORIES } from '../constants';

interface TemplatesPageProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplatesPage: React.FC<TemplatesPageProps> = ({ onSelectTemplate }) => {
  return (
    <div className="animate-fadeIn">
      <TemplateSelector
        categories={TEMPLATE_CATEGORIES}
        onSelectTemplate={onSelectTemplate}
      />
    </div>
  );
};

export default TemplatesPage;
