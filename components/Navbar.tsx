import React, { useContext, useState, useRef, useEffect } from 'react';
import { PageState } from '../App';
import { AuthContext } from '../context/AuthContext';
import { UserCircleIcon } from './ui/Icons';

interface NavbarProps {
    currentPage: PageState;
    onNavigate: (page: PageState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const linkClasses = (pageName: PageState['name']) => 
      `cursor-pointer px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        currentPage.name === pageName
          ? 'text-primary'
          : 'text-muted hover:text-dark'
      }`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    onNavigate({ name: 'home' });
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 
          className="text-2xl font-bold text-primary cursor-pointer"
          onClick={() => onNavigate({ name: 'home' })}
        >
          CVBuilderBD
        </h1>
        <nav className="hidden md:flex items-center space-x-2">
            <a onClick={() => onNavigate({ name: 'home'})} className={linkClasses('home')}>Home</a>
            <a onClick={() => onNavigate({ name: 'templates'})} className={linkClasses('templates')}>Templates</a>
            {user && <a onClick={() => onNavigate({ name: 'dashboard'})} className={linkClasses('dashboard')}>Dashboard</a>}
            {user && user.role === 'admin' && (
              <a onClick={() => onNavigate({ name: 'admin'})} className={linkClasses('admin')}>Admin</a>
            )}
            <a onClick={() => onNavigate({ name: 'blog'})} className={linkClasses('blog')}>Blog</a>
            <a onClick={() => onNavigate({ name: 'contact'})} className={linkClasses('contact')}>Contact Us</a>
        </nav>
        <div className="flex items-center gap-2">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 rounded-full hover:bg-gray-100 p-1 pr-3 transition-colors">
                  {user.photo ? (
                    <img src={user.photo} alt="User" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <UserCircleIcon className="w-8 h-8 text-gray-400" />
                  )}
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name || user.email}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border py-1 z-50">
                    <a onClick={() => { onNavigate({ name: 'dashboard' }); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Dashboard</a>
                    <a onClick={() => { onNavigate({ name: 'profile' }); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Profile</a>
                    <div className="border-t my-1"></div>
                    <a onClick={handleLogout} className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer">Logout</a>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={() => onNavigate({ name: 'login' })} className="hidden sm:block text-sm font-semibold text-primary py-2 px-4 rounded-md hover:bg-primary/10 transition-colors">
                    Sign In
                </button>
                <button onClick={() => onNavigate({ name: 'register' })} className="text-sm font-semibold bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors shadow-sm">
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