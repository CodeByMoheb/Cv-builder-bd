
import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import EditorView from './components/EditorView';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ContactPage from './pages/ContactPage';
import AdminLayout from './pages/admin/AdminLayout';

import { ResumeData, Template, SavedResume } from './types';
import { INITIAL_RESUME_DATA, TEMPLATES_MAP } from './constants';
import * as api from './services/api';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export type PageState =
  | { name: 'home' }
  | { name: 'templates' }
  | { name: 'editor'; params: { template: Template } }
  | { name: 'dashboard' }
  | { name: 'login' }
  | { name: 'register' }
  | { name: 'profile' }
  | { name: 'blog' }
  | { name: 'blogDetail'; params: { slug: string } }
  | { name: 'contact' }
  | { name: 'admin'; params?: { section?: string } };

const AppContent: React.FC = () => {
  const { user, loading } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState<PageState>({ name: 'home' });
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [currentCvId, setCurrentCvId] = useState<string | null>(null);

  // State for PDF generation
  const printRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfTemplate, setPdfTemplate] = useState<Template | null>(null);
  const [pdfResumeData, setPdfResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    // Redirect logic
    if (!loading && !user) {
      if (['dashboard', 'profile', 'admin'].includes(currentPage.name)) {
        setCurrentPage({ name: 'login' });
      }
    }
  }, [user, loading, currentPage]);

  const handleNavigate = (page: PageState) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setResumeData(INITIAL_RESUME_DATA);
    setCurrentCvId(null);
    handleNavigate({ name: 'editor', params: { template } });
  };

  const handleCreateNew = () => {
    handleNavigate({ name: 'templates' });
  };

  const handleEdit = async (id: string) => {
    const cvToEdit = await api.getResume(id);
    if (cvToEdit) {
      const template = TEMPLATES_MAP[cvToEdit.templateId];
      if (template) {
        setResumeData(cvToEdit.resumeData);
        setSelectedTemplate(template);
        setCurrentCvId(cvToEdit.id);
        handleNavigate({ name: 'editor', params: { template } });
      }
    }
  };
  
  const handleSave = async (name: string): Promise<void> => {
    if (!selectedTemplate) throw new Error("No template selected");
    
    const dataToSave: Omit<SavedResume, 'id' | 'userId' | 'lastModified'> = {
      name: name,
      resumeData: resumeData,
      templateId: selectedTemplate.id,
    };

    if (currentCvId) {
      const updatedCv = await api.updateResume(currentCvId, dataToSave);
      setCurrentCvId(updatedCv.id); // Ensure ID is set
    } else {
      const newCv = await api.saveResume(dataToSave);
      setCurrentCvId(newCv.id);
    }
  };

  const handleDownload = async (id?: string) => {
    let cvData: SavedResume | null = null;

    if (id) { // From dashboard
        cvData = await api.getResume(id);
    } else if(currentCvId) { // From editor after saving
        cvData = await api.getResume(currentCvId);
    }

    if (cvData) {
        const template = TEMPLATES_MAP[cvData.templateId];
        if (template) {
            await generatePdf(template, cvData.resumeData);
        }
    } else if (selectedTemplate) { // From editor without saving
        await generatePdf(selectedTemplate, resumeData);
    }
  };
  
  const generatePdf = async (template: Template, data: ResumeData) => {
    setIsGeneratingPdf(true);
    setPdfTemplate(template);
    setPdfResumeData(data);

    // Allow time for the offscreen component to render with the correct data
    setTimeout(async () => {
        const element = printRef.current;
        if (!element) {
            setIsGeneratingPdf(false);
            return;
        }

        const canvas = await html2canvas(element, { scale: 3 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'pt', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${data.personalInfo.name}_Resume.pdf`);

        // Cleanup
        setPdfTemplate(null);
        setPdfResumeData(null);
        setIsGeneratingPdf(false);
    }, 500);
  };


  const renderPage = () => {
    switch (currentPage.name) {
      case 'home':
        return <HomePage onNavigate={() => handleNavigate({ name: 'templates' })} />;
      case 'templates':
        return <TemplatesPage onSelectTemplate={handleSelectTemplate} />;
      case 'editor':
        return (
          <EditorView
            template={selectedTemplate!}
            resumeData={resumeData}
            setResumeData={setResumeData}
            onBack={() => handleNavigate({ name: user ? 'dashboard' : 'templates' })}
            onSave={handleSave}
            currentCvId={currentCvId}
            onGeneratePdf={() => handleDownload()}
          />
        );
      case 'dashboard':
        return <DashboardPage onEdit={handleEdit} onDownload={handleDownload} onCreateNew={handleCreateNew} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'blogDetail':
        return <BlogDetailPage slug={currentPage.params.slug} onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminLayout onNavigate={handleNavigate} section={currentPage.params?.section || 'overview'} />;
      default:
        return <HomePage onNavigate={() => handleNavigate({ name: 'templates' })} />;
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Application...</div>;
  }

  return (
    <>
        <Layout currentPage={currentPage} onNavigate={handleNavigate}>
            {renderPage()}
        </Layout>
        
        {/* Off-screen container for PDF generation */}
        {isGeneratingPdf && pdfTemplate && pdfResumeData && (
          <div style={{ position: 'absolute', left: '-9999px', top: 0, zIndex: -10 }}>
            <div ref={printRef} style={{ width: '595pt', height: '842pt', backgroundColor: 'white' }}>
                <pdfTemplate.component resumeData={pdfResumeData} />
            </div>
          </div>
        )}
    </>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
