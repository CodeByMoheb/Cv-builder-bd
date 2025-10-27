
import React from 'react';
import { Page } from '../App';

interface NavbarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const linkClasses = (page: Page) => 
      `cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        currentPage === page
          ? 'bg-primary text-white shadow-sm'
          : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
      }`;
  
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 
          className="text-2xl font-bold text-primary cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          CVBuilderBD
        </h1>
        <nav className="flex items-center space-x-2 md:space-x-4">
            <a onClick={() => onNavigate('home')} className={linkClasses('home')}>Home</a>
            <a onClick={() => onNavigate('templates')} className={linkClasses('templates')}>Templates</a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
