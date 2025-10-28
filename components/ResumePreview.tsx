import React, { useState, useRef, useEffect } from 'react';
import { ResumeData, Template } from '../types';
import { MoveIcon, XIcon } from './ui/Icons';

interface ResumePreviewProps {
  template: Template;
  resumeData: ResumeData;
  isOpen: boolean;
  onClose: () => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ template, resumeData, isOpen, onClose }) => {
  const TemplateComponent = template.component;
  
  // A4 aspect ratio in a smaller container
  const PREVIEW_SCALE = 0.5;
  const PREVIEW_WIDTH = 595 * PREVIEW_SCALE; // A4 pt width * scale

  const [position, setPosition] = useState({ 
      x: window.innerWidth - PREVIEW_WIDTH - 60, 
      y: 120 
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    // Prevent text selection while dragging
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragStartPos.current.x;
      const newY = e.clientY - dragStartPos.current.y;

      // Clamp position to stay within viewport
      const clampedX = Math.max(0, Math.min(newX, window.innerWidth - (previewRef.current?.offsetWidth || 0)));
      const clampedY = Math.max(0, Math.min(newY, window.innerHeight - (previewRef.current?.offsetHeight || 0)));

      setPosition({ x: clampedX, y: clampedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  const containerStyle: React.CSSProperties = {
    width: `${PREVIEW_WIDTH}px`,
    height: `${842 * PREVIEW_SCALE}px`,
    transition: 'opacity 0.3s, transform 0.3s',
  };

  if (isOpen) {
    containerStyle.position = 'fixed';
    containerStyle.top = `${position.y}px`;
    containerStyle.left = `${position.x}px`;
    containerStyle.opacity = 1;
    containerStyle.transform = 'scale(1)';
    containerStyle.pointerEvents = 'auto';
  } else {
    // Position off-screen and make invisible but keep in DOM for printing
    containerStyle.position = 'fixed';
    containerStyle.top = '0px';
    containerStyle.left = '-9999px';
    containerStyle.opacity = 0;
    containerStyle.transform = 'scale(0.9)';
    containerStyle.pointerEvents = 'none';
  }

  return (
    <div
      ref={previewRef}
      className="bg-white rounded-lg shadow-2xl z-30 flex flex-col"
      style={containerStyle}
    >
      <div 
        className="h-10 bg-gray-200 rounded-t-lg flex items-center justify-between px-3 cursor-grab"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
            <MoveIcon className="w-5 h-5 text-gray-500" />
            <span className="font-semibold text-gray-700 text-sm">{template.name} Preview</span>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <XIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="overflow-hidden flex-grow">
        <div
            style={{
                transform: `scale(${PREVIEW_SCALE})`,
                transformOrigin: 'top left',
            }}
        >
            <div id="pdf-content" className="bg-white w-[595pt] h-[842pt]">
                <TemplateComponent resumeData={resumeData} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;