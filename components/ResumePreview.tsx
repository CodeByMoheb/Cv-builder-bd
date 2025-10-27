import React, { useLayoutEffect, useState, forwardRef } from 'react';
import { ResumeData, Template } from '../types';

interface ResumePreviewProps {
  template: Template;
  resumeData: ResumeData;
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(({ template, resumeData }, ref) => {
  const TemplateComponent = template.component;
  const [scale, setScale] = useState(1);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const calculateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const A4_WIDTH_PT = 595;

        const availableWidth = containerWidth - 32;

        if (availableWidth < A4_WIDTH_PT) {
          setScale(availableWidth / A4_WIDTH_PT);
        } else {
          setScale(1);
        }
      }
    };
    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-lg shadow-lg h-full overflow-hidden"
    >
      <div className="p-4 h-full w-full overflow-auto bg-gray-200 flex items-start justify-center">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
            }}
            className="transition-transform duration-200"
          >
            <div ref={ref} id="pdf-content" className="bg-white shadow-2xl w-[595pt] h-[842pt] overflow-hidden">
              <TemplateComponent resumeData={resumeData} />
            </div>
          </div>
      </div>
    </div>
  );
});

export default ResumePreview;