import React, { useRef, useLayoutEffect, useState } from 'react';
import { ResumeData, Template } from '../types';

interface ResumePreviewProps {
  template: Template;
  resumeData: ResumeData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ template, resumeData }) => {
  const TemplateComponent = template.component;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const calculateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const A4_WIDTH_PT = 595; // A4 width in points

        // Account for padding within the container
        const availableWidth = containerWidth - 32; // p-4 on each side

        if (availableWidth < A4_WIDTH_PT) {
          setScale(availableWidth / A4_WIDTH_PT);
        } else {
          setScale(1);
        }
      }
    };

    // Calculate scale on mount and on window resize
    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  return (
    // This is the container that defines the available space for the preview.
    // Stickiness is now handled by the parent EditorView component.
    <div 
      ref={containerRef}
      className="bg-white rounded-lg shadow-lg h-full overflow-hidden"
    >
      {/* This inner div handles scrolling and centers the scaled preview */}
      <div className="p-4 h-full w-full overflow-auto bg-gray-200 flex items-start justify-center">
          {/* This wrapper is for positioning and scaling the resume "page" */}
          <div
            id="resume-preview-wrapper" 
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
            }}
            className="transition-transform duration-200"
          >
            {/* The content itself is fixed-size to simulate a real A4 page for perfect PDF generation */}
            <div 
              id="pdf-content" 
              className="bg-white shadow-2xl w-[595pt] h-[842pt] overflow-hidden" // A4 dimensions in points
            >
              <TemplateComponent resumeData={resumeData} />
            </div>
          </div>
      </div>
    </div>
  );
};

export default ResumePreview;