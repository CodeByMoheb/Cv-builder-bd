import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData, Template } from '../types';
import ResumeEditor from './ResumeEditor';
import ResumePreview from './ResumePreview';
import { ArrowLeftIcon, DownloadIcon } from './ui/Icons';

interface EditorViewProps {
  template: Template;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  onBack: () => void;
}

const EditorView: React.FC<EditorViewProps> = ({ template, resumeData, setResumeData, onBack }) => {
    
  const handleDownloadPdf = () => {
    // Target the fixed-size inner div for a perfect 1:1 render
    const previewElement = document.getElementById('pdf-content');
    if (previewElement) {
        html2canvas(previewElement, {
            // The source element is already at full A4 resolution, so scale is 1
            scale: 1,
            useCORS: true,
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4' // [595.28, 841.89] points
            });
            
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            // The canvas should match the PDF dimensions perfectly now
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`CV_${resumeData.personalInfo.name.replace(' ', '_')}_${template.name}.pdf`);
        });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-200"
        >
          <ArrowLeftIcon />
          Back to Templates
        </button>
        <button
            onClick={handleDownloadPdf}
            className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
        >
            <DownloadIcon />
            Download as PDF
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left column for the editor form, takes up 3/5 of the space on large screens */}
        <div className="lg:col-span-3">
          <ResumeEditor resumeData={resumeData} setResumeData={setResumeData} />
        </div>
        
        {/* Right column for the live preview, takes up 2/5 of the space */}
        <div className="lg:col-span-2 lg:sticky lg:top-24">
          <ResumePreview template={template} resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
};

export default EditorView;