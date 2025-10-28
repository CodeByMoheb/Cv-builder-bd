import React, { useContext } from 'react';
import { Page } from '../App';
import { AuthContext } from '../context/AuthContext';

interface NavbarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { user, logout } = useContext(AuthContext);

  const linkClasses = (page: Page) => 
      `cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        currentPage === page
          ? 'text-primary'
          : 'text-muted hover:text-dark'
      }`;
  
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 
          className="text-2xl font-bold text-primary cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          CVBuilderBD
        </h1>
        <nav className="hidden md:flex items-center space-x-2">
            <a onClick={() => onNavigate('home')} className={linkClasses('home')}>Home</a>
            <a onClick={() => onNavigate('templates')} className={linkClasses('templates')}>Templates</a>
            {user && <a onClick={() => onNavigate('dashboard')} className={linkClasses('dashboard')}>Dashboard</a>}
            {user && user.role === 'admin' && (
              <a onClick={() => onNavigate('admin')} className={linkClasses('admin')}>Admin</a>
            )}
            <a href="#" className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-muted hover:text-dark">Blog</a>
            <a href="#" className="cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-muted hover:text-dark">Contact Us</a>
        </nav>
        <div className="flex items-center gap-2">
            {user ? (
              <button 
                onClick={logout} 
                className="text-sm font-semibold bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors shadow-sm"
              >
                Logout
              </button>
            ) : (
              <>
                <button onClick={() => onNavigate('login')} className="hidden sm:block text-sm font-semibold text-primary py-2 px-4 rounded-md hover:bg-primary/10 transition-colors">
                    Sign In
                </button>
                <button onClick={() => onNavigate('register')} className="text-sm font-semibold bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors shadow-sm">
                    Sign Up
                </button>
              </>
            )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;