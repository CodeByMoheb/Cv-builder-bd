import React, { useState, useMemo } from 'react';
import { Template } from '../types';
import { TEMPLATE_CATEGORIES, INITIAL_RESUME_DATA } from '../constants';

interface TemplatesPageProps {
  onSelectTemplate: (template: Template) => void;
}

const TemplatesPage: React.FC<TemplatesPageProps> = ({ onSelectTemplate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [featureFilter, setFeatureFilter] = useState('all'); // 'all', 'photo', 'no-photo'

  const filteredCategories = useMemo(() => {
    let categories = TEMPLATE_CATEGORIES;

    if (selectedCategory !== 'All') {
      categories = categories.filter(category => category.name === selectedCategory);
    }

    return categories
      .map(category => {
        const filteredTemplates = category.templates.filter(template => {
          const featureMatch =
            featureFilter === 'all' ||
            (featureFilter === 'photo' && template.hasPhoto) ||
            (featureFilter === 'no-photo' && !template.hasPhoto);

          const searchMatch = template.name.toLowerCase().includes(searchTerm.toLowerCase());

          return featureMatch && searchMatch;
        });

        return { ...category, templates: filteredTemplates };
      })
      .filter(category => category.templates.length > 0);
  }, [searchTerm, selectedCategory, featureFilter]);
  
  const totalTemplatesFound = filteredCategories.reduce((acc, cat) => acc + cat.templates.length, 0);

  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-dark">Choose Your Template</h1>
        <p className="mt-2 text-lg text-muted">Select a professionally designed, ATS-friendly template to get started.</p>
      </div>

      {/* Filter and Search Section */}
      <div className="sticky top-[72px] bg-white/80 backdrop-blur-sm z-20 py-4 px-4 rounded-lg shadow-sm border mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-1">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input"
            />
          </div>
          <div className="md:col-span-1">
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="input"
              aria-label="Filter by category"
            >
              <option value="All">All Categories</option>
              {TEMPLATE_CATEGORIES.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-1">
            <select
              value={featureFilter}
              onChange={e => setFeatureFilter(e.target.value)}
              className="input"
              aria-label="Filter by feature"
            >
              <option value="all">All Features</option>
              <option value="photo">With Photo</option>
              <option value="no-photo">Without Photo</option>
            </select>
          </div>
        </div>
      </div>

      {totalTemplatesFound > 0 ? (
        filteredCategories.map((category) => (
          <div key={category.name}>
            <h2 className="text-2xl font-semibold text-dark mb-4">{category.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
              {category.templates.map((template) => {
                const TemplatePreviewComponent = template.component;
                return (
                  <div
                    key={template.id}
                    className="group cursor-pointer"
                    onClick={() => onSelectTemplate(template)}
                  >
                    <div className="aspect-[1/1.414] bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2 border">
                      <div className="pointer-events-none transform-gpu scale-[0.28] origin-top-left">
                          <div className="w-[595pt] h-[842pt] bg-white">
                              <TemplatePreviewComponent resumeData={INITIAL_RESUME_DATA} />
                          </div>
                      </div>
                    </div>
                    <p className="mt-2 text-center text-muted font-medium group-hover:text-primary text-sm">{template.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md border">
          <h3 className="text-xl font-medium text-dark">No Templates Found</h3>
          <p className="mt-1 text-muted">
              Try adjusting your search or filter criteria to find the perfect template.
          </p>
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;