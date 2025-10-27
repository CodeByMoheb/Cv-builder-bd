import React, { useState, useRef } from 'react';
import { ResumeData, Template } from '../types';
import ResumeEditor from './ResumeEditor';
import ResumePreview from './ResumePreview';
import { ArrowLeftIcon, DownloadIcon } from './ui/Icons';
import PaymentModal from './PaymentModal';

// Extend the Window interface to declare global libraries
declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

interface EditorViewProps {
  template: Template;
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  onBack: () => void;
}

const EditorView: React.FC<EditorViewProps> = ({ template, resumeData, setResumeData, onBack }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
    
  // Custom PDF generation function to replace react-to-print
  const generatePdf = async () => {
    const contentToPrint = printRef.current;
    if (!contentToPrint) {
      console.error("Content to print is not available.");
      return;
    }
    
    // Using libraries from the global window object, as they are loaded via <script> tags
    const { jsPDF } = window.jspdf;
    const html2canvas = window.html2canvas;

    try {
      // Use html2canvas to capture the content as an image
      const canvas = await html2canvas(contentToPrint, {
        scale: 2, // Increase scale for better resolution
        useCORS: true, 
      });

      const imgData = canvas.toDataURL('image/png');

      // Create a new PDF in A4 format
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Add the captured image to the PDF, fitting it to the A4 page
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Save the PDF
      pdf.save(`CV_${resumeData.personalInfo.name.replace(' ', '_')}_${template.name}.pdf`);

    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    // Add a small delay to allow the modal to close before generating the PDF
    setTimeout(() => {
        generatePdf();
    }, 100); 
  };

  return (
    <>
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
              onClick={() => setIsPaymentModalOpen(true)}
              className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg"
          >
              <DownloadIcon />
              Download as PDF
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3 bg-white rounded-lg shadow-md">
            <ResumeEditor resumeData={resumeData} setResumeData={setResumeData} />
          </div>
          
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <ResumePreview template={template} resumeData={resumeData} ref={printRef} />
          </div>
        </div>
      </div>
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default EditorView;