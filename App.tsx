import React, { useState, useEffect, useRef, useContext } from 'react';
import { ResumeData, Template, SavedResume } from './types';
import { INITIAL_RESUME_DATA, TEMPLATES_MAP } from './constants';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import EditorView from './components/EditorView';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import { AuthProvider, AuthContext } from './context/AuthContext';
import * as api from './services/api';

export type Page = 'home' | 'templates' | 'editor' | 'dashboard' | 'login' | 'register' | 'admin' | 'blog' | 'contact';

declare global {
  interface Window {
    jspdf: any;
    html2canvas: any;
  }
}

const AppContent: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [currentCvId, setCurrentCvId] = useState<string | null>(null);
  
  const [resumeForPdf, setResumeForPdf] = useState<SavedResume | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  
  const { user, loading } = useContext(AuthContext);

  const protectedPages: Page[] = ['editor', 'dashboard', 'admin'];

  useEffect(() => {
    // If user is not logged in and tries to access a protected page, redirect to login
    if (!loading && !user && protectedPages.includes(page)) {
      setPage('login');
    }
    // If user is logged in but not an admin and tries to access admin page, redirect to dashboard
    if (!loading && user && user.role !== 'admin' && page === 'admin') {
      setPage('dashboard');
    }
  }, [user, page, loading]);


  useEffect(() => {
    if (resumeForPdf) {
      setTimeout(() => {
        generatePdf(resumeForPdf.resumeData, TEMPLATES_MAP[resumeForPdf.templateId]);
        setResumeForPdf(null);
      }, 100);
    }
  }, [resumeForPdf]);

  const generatePdf = async (data: ResumeData, template: Template) => {
    const contentToPrint = printRef.current;
    if (!contentToPrint) return;
    
    const { jsPDF } = window.jspdf;
    const html2canvas = window.html2canvas;

    try {
      const canvas = await html2canvas(contentToPrint, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`CV_${data.personalInfo.name.replace(' ', '_')}_${template.name}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleSelectTemplate = (template: Template) => {
    if (!user) {
      navigateTo('login');
      return;
    }
    setSelectedTemplate(template);
    setResumeData(INITIAL_RESUME_DATA);
    setCurrentCvId(null);
    setPage('editor');
    window.scrollTo(0, 0);
  };

  const navigateTo = (targetPage: Page) => {
    if (page === 'editor' && targetPage !== 'editor') {
      setSelectedTemplate(null);
      setCurrentCvId(null);
    }
    setPage(targetPage);
    window.scrollTo(0, 0);
  };

  const handleSaveCv = async (name: string) => {
    if (!selectedTemplate) return;
    
    if (currentCvId) { // Update
      await api.updateResume(currentCvId, { name, resumeData });
    } else { // Create
      const newCv = await api.createResume({ name, resumeData, templateId: selectedTemplate.id });
      setCurrentCvId(newCv.id);
    }
  };

  const handleEditCv = async (cvId: string) => {
    const cvToEdit = await api.getResumeById(cvId);
    if (cvToEdit) {
      setResumeData(cvToEdit.resumeData);
      setSelectedTemplate(TEMPLATES_MAP[cvToEdit.templateId]);
      setCurrentCvId(cvToEdit.id);
      setPage('editor');
      window.scrollTo(0, 0);
    }
  };
  
  const handleDownloadCv = async (cvId: string) => {
      const cvToDownload = await api.getResumeById(cvId);
      if (cvToDownload) {
          setResumeForPdf(cvToDownload);
      }
  };

  const renderPage = () => {
    if (loading) {
      return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
    }
    
    switch (page) {
      case 'home':
        return <HomePage onNavigate={() => navigateTo('templates')} />;
      case 'templates':
        return <TemplatesPage onSelectTemplate={handleSelectTemplate} />;
      case 'login':
        return <LoginPage onNavigate={navigateTo} />;
      case 'register':
        return <RegisterPage onNavigate={navigateTo} />;
      case 'dashboard':
        return <DashboardPage onEdit={handleEditCv} onDownload={handleDownloadCv} onCreateNew={() => navigateTo('templates')} />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      case 'editor':
        if (selectedTemplate) {
          return (
            <EditorView
              template={selectedTemplate}
              resumeData={resumeData}
              setResumeData={setResumeData}
              onBack={() => navigateTo(user?.role === 'admin' ? 'admin' : 'dashboard')}
              onSave={handleSaveCv}
              currentCvId={currentCvId}
              onGeneratePdf={() => generatePdf(resumeData, selectedTemplate)}
            />
          );
        }
        navigateTo('templates');
        return null;
      default:
        return <HomePage onNavigate={() => navigateTo('templates')} />;
    }
  };
  
  const TemplateForPdf = resumeForPdf ? TEMPLATES_MAP[resumeForPdf.templateId]?.component : null;

  return (
    <Layout currentPage={page} onNavigate={navigateTo}>
      {renderPage()}
      <div className="absolute top-0 left-[-9999px] -z-10" aria-hidden="true">
        <div ref={printRef} className="bg-white w-[595pt] h-[842pt]">
           {page === 'editor' && selectedTemplate && <selectedTemplate.component resumeData={resumeData} />}
           {resumeForPdf && TemplateForPdf && <TemplateForPdf resumeData={resumeForPdf.resumeData} />}
        </div>
      </div>
    </Layout>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;