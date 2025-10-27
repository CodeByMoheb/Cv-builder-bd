
import React, { useState } from 'react';
import { ResumeData, Template } from './types';
import { INITIAL_RESUME_DATA } from './constants';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import EditorView from './components/EditorView';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export type Page = 'home' | 'templates' | 'editor';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setPage('editor');
    window.scrollTo(0, 0);
  };

  const navigateTo = (targetPage: Page) => {
    // Reset template when leaving editor to ensure a clean state
    if (page === 'editor' && targetPage !== 'editor') {
      setSelectedTemplate(null);
    }
    setPage(targetPage);
    window.scrollTo(0, 0); // Scroll to top on every page change
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage onNavigate={() => navigateTo('templates')} />;
      case 'templates':
        return <TemplatesPage onSelectTemplate={handleSelectTemplate} />;
      case 'editor':
        if (selectedTemplate) {
          return (
            <EditorView
              template={selectedTemplate}
              resumeData={resumeData}
              setResumeData={setResumeData}
              onBack={() => navigateTo('templates')}
            />
          );
        }
        // Fallback: If editor is accessed without a template, redirect to templates page
        navigateTo('templates');
        return null;
      default:
        return <HomePage onNavigate={() => navigateTo('templates')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <Navbar currentPage={page} onNavigate={navigateTo} />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
