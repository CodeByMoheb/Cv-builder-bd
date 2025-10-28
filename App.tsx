
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Template, ResumeData, SavedResume } from './types';
import { TEMPLATE_CATEGORIES, INITIAL_RESUME_DATA, TEMPLATES_MAP } from './constants';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import EditorView from './components/EditorView';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ContactPage from './pages/ContactPage';
import AdminLayout from './pages/admin/AdminLayout';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as api from './services/api';

export type PageState =
  | { name: 'home' }
  | { name: 'templates' }
  | { name: 'editor'; params: { templateId: string; cvId?: string | null } }
  | { name: 'dashboard' }
  | { name: 'login' }
  | { name: 'register' }
  | { name: 'forgot-password' }
  | { name: 'reset-password'; params: { token: string } }
  | { name: 'profile' }
  | { name: 'blog' }
  | { name: 'blogDetail'; params: { slug: string } }
  | { name: 'contact' }
  | { name: 'admin'; params?: { section?: string } };

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageState>({ name: 'home' });
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [currentCvId, setCurrentCvId] = useState<string | null>(null);
  const { user, loading } = useContext(AuthContext);

  const handleNavigate = useCallback((page: PageState) => {
    // Prevent non-admins from accessing admin pages
    if (page.name === 'admin' && user?.role !== 'admin') {
      setCurrentPage({ name: 'home' });
      return;
    }
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, [user]);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setResumeData(INITIAL_RESUME_DATA);
    setCurrentCvId(null);
    handleNavigate({ name: 'editor', params: { templateId: template.id } });
  };
  
  const handleEditResume = async (cvId: string) => {
    try {
        const resumeToEdit = await api.getResumeById(cvId);
        if (resumeToEdit) {
            const template = TEMPLATES_MAP[resumeToEdit.templateId];
            if (template) {
                setSelectedTemplate(template);
                setResumeData(resumeToEdit.resumeData);
                setCurrentCvId(resumeToEdit.id);
                handleNavigate({ name: 'editor', params: { templateId: template.id, cvId: resumeToEdit.id }});
            } else {
                alert("Template for this resume could not be found.");
            }
        }
    } catch (error) {
        console.error("Failed to load resume for editing:", error);
        alert("Could not load the selected resume.");
    }
  };
  
  const handleSaveResume = async (name: string): Promise<void> => {
    if (!selectedTemplate) throw new Error("No template selected");

    const resumeToSave: Omit<SavedResume, 'id' | 'userId' | 'lastModified'> = {
        name,
        resumeData,
        templateId: selectedTemplate.id,
    };
    
    if (currentCvId) {
        const updatedCv = await api.updateResume(currentCvId, resumeToSave);
        setCurrentCvId(updatedCv.id);
    } else {
        const newCv = await api.createResume(resumeToSave);
        setCurrentCvId(newCv.id);
    }
  };
  
  const handleGeneratePdf = () => {
    const previewElement = document.getElementById('resume-preview-content');
    if (!previewElement) {
        alert("Could not find resume content to generate PDF.");
        return;
    }
    
    html2canvas(previewElement, {
        scale: 4, // Higher scale for better quality
        useCORS: true,
        logging: true,
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
        const imgWidth = canvasWidth * ratio;
        const imgHeight = canvasHeight * ratio;
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save(`${resumeData.personalInfo.name}_Resume.pdf`);
    });
  };

  const renderPage = () => {
    switch (currentPage.name) {
      case 'home':
        return <HomePage onNavigate={() => handleNavigate({ name: 'templates' })} />;
      case 'templates':
        return <TemplatesPage onSelectTemplate={handleSelectTemplate} />;
      case 'editor':
        if (selectedTemplate) {
          return <EditorView 
                    template={selectedTemplate} 
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                    onBack={() => handleNavigate({ name: 'dashboard' })}
                    onSave={handleSaveResume}
                    currentCvId={currentCvId}
                    onGeneratePdf={handleGeneratePdf}
                 />;
        }
        // Fallback if editor is accessed directly without a template
        handleNavigate({ name: 'templates' }); 
        return null;
      case 'dashboard':
        return <DashboardPage onEdit={handleEditResume} onDownload={handleEditResume} onCreateNew={() => handleNavigate({ name: 'templates' })} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'forgot-password':
        return <ForgotPasswordPage onNavigate={handleNavigate} />;
      case 'reset-password':
        return <ResetPasswordPage onNavigate={handleNavigate} token={currentPage.params.token} />;
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

  useEffect(() => {
    // Handle deep linking for password reset
    const hash = window.location.hash.slice(1);
    if (hash.startsWith('reset-password?')) {
      const params = new URLSearchParams(hash.split('?')[1]);
      const token = params.get('token');
      if (token) {
        setCurrentPage({ name: 'reset-password', params: { token } });
        // Clean the hash to prevent re-triggering
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }

    if (!loading && !user && (currentPage.name === 'dashboard' || currentPage.name === 'profile' || currentPage.name === 'editor' || currentPage.name === 'admin')) {
      handleNavigate({ name: 'login' });
    }
  }, [user, loading, handleNavigate]);
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return <Layout currentPage={currentPage} onNavigate={handleNavigate}>{renderPage()}</Layout>;
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
