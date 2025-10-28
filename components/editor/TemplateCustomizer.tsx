import React, { useState, useRef } from 'react';
import { ResumeData } from '../../types';
import { MoveIcon } from '../ui/Icons';

interface TemplateCustomizerProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const SectionHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-lg font-semibold text-gray-800 mb-3">{children}</h3>
);

const FONT_OPTIONS = {
  'Roboto, sans-serif': 'Sans Serif',
  'serif': 'Serif',
  'monospace': 'Monospace',
};

const TemplateCustomizer: React.FC<TemplateCustomizerProps> = ({ resumeData, setResumeData }) => {
  const { customization } = resumeData;
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      customization: {
        ...prev.customization,
        colors: { ...prev.customization.colors, [name]: value },
      },
    }));
  };
  
  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setResumeData(prev => ({
      ...prev,
      customization: { ...prev.customization, font: e.target.value },
    }));
  };

  const handleDragSort = () => {
    const newSectionOrder = [...customization.sectionOrder];
    const draggedItemContent = newSectionOrder.splice(dragItem.current!, 1)[0];
    newSectionOrder.splice(dragOverItem.current!, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;

    setResumeData(prev => ({
        ...prev,
        customization: { ...prev.customization, sectionOrder: newSectionOrder }
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <SectionHeader>Colors</SectionHeader>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Primary</label>
                <input type="color" name="primary" value={customization.colors.primary} onChange={handleColorChange} className="w-full h-10 p-1 bg-white border border-gray-300 rounded-md cursor-pointer" />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Text</label>
                <input type="color" name="text" value={customization.colors.text} onChange={handleColorChange} className="w-full h-10 p-1 bg-white border border-gray-300 rounded-md cursor-pointer" />
            </div>
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Background</label>
                <input type="color" name="background" value={customization.colors.background} onChange={handleColorChange} className="w-full h-10 p-1 bg-white border border-gray-300 rounded-md cursor-pointer" />
            </div>
        </div>
      </div>
      <div>
        <SectionHeader>Typography</SectionHeader>
         <div className="flex flex-col">
            <label htmlFor="font-select" className="text-sm font-medium text-gray-700 mb-1">Font Family</label>
            <select id="font-select" value={customization.font} onChange={handleFontChange} className="input">
                {Object.entries(FONT_OPTIONS).map(([fontFamily, name]) => (
                    <option key={fontFamily} value={fontFamily} style={{fontFamily}}>{name}</option>
                ))}
            </select>
        </div>
      </div>
       <div>
        <SectionHeader>Layout</SectionHeader>
        <p className="text-sm text-gray-600 mb-3">Drag and drop to reorder the sections of your resume.</p>
        <div className="space-y-2">
            {customization.sectionOrder.map((section, index) => (
                 <div
                    key={section}
                    draggable
                    onDragStart={() => (dragItem.current = index)}
                    onDragEnter={() => (dragOverItem.current = index)}
                    onDragEnd={handleDragSort}
                    onDragOver={(e) => e.preventDefault()}
                    className="flex items-center gap-2 p-2 bg-gray-100 rounded-md cursor-grab active:cursor-grabbing border"
                >
                    <MoveIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium capitalize text-gray-700">{section}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateCustomizer;