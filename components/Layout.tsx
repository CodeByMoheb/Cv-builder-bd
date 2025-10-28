
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
  const isAdminPage = currentPage.name === 'admin';

  // The AdminLayout provides its own structure, so we don't need the standard Navbar/Footer.
  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Navbar currentPage={currentPage} onNavigate={onNavigate} />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-8">
        {children}
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default Layout;
