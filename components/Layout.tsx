import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { PageState } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: PageState;
  onNavigate: (page: PageState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const isFullWidthPage = currentPage.name === 'editor' || currentPage.name === 'admin';
  const nonContainedPages = ['home'];

  const useContainer = !isFullWidthPage && !nonContainedPages.includes(currentPage.name);

  // Do not render Footer on admin pages
  const showFooter = currentPage.name !== 'admin';

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={onNavigate} />
      <main className="flex-grow">
        {isFullWidthPage ? (
          <div>{children}</div>
        ) : useContainer ? (
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            {children}
          </div>
        ) : (
          children
        )}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
