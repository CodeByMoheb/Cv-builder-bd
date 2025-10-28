import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Page } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
  const isFullWidthPage = currentPage === 'editor';
  const nonContainedPages = ['home'];

  const useContainer = !isFullWidthPage && !nonContainedPages.includes(currentPage);

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
      <Footer />
    </div>
  );
};

export default Layout;