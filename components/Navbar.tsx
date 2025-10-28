
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PageState } from '../App';
import { XIcon, DocumentTextIcon, UsersIcon } from './ui/Icons';

interface NavbarProps {
  currentPage: PageState;
  onNavigate: (page: PageState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', page: { name: 'home' } as PageState },
    { name: 'Templates', page: { name: 'templates' } as PageState },
    { name: 'Blog', page: { name: 'blog' } as PageState },
    { name: 'Contact', page: { name: 'contact' } as PageState },
  ];

  const NavLink: React.FC<{ page: PageState, children: React.ReactNode }> = ({ page, children }) => {
    const isActive = currentPage.name === page.name;
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onNavigate(page);
          setIsMobileMenuOpen(false);
        }}
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-200'
        } transition-colors`}
      >
        {children}
      </a>
    );
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate({ name: 'home' })}>
              <h1 className="text-2xl font-bold text-primary">CVBuilderBD</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <NavLink key={link.name} page={link.page}>{link.name}</NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <>
                  {user.role === 'admin' && (
                     <button
                        onClick={() => onNavigate({ name: 'admin' })}
                        className="mr-3 bg-red-100 text-red-700 hover:bg-red-200 font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 text-sm"
                    >
                       Admin Panel
                    </button>
                  )}
                  <button
                    onClick={() => onNavigate({ name: 'dashboard' })}
                    className="mr-3 bg-secondary hover:bg-gray-200 text-dark font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all duration-200 text-sm"
                  >
                    Dashboard
                  </button>
                  <div className="relative group">
                     <button onClick={() => onNavigate({ name: 'profile' })} className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                         {user.photo ? <img src={user.photo} alt="profile" className="w-10 h-10 rounded-full object-cover" /> : <UsersIcon className="w-6 h-6 text-gray-500" />}
                     </button>
                  </div>
                  <button
                    onClick={logout}
                    className="ml-3 text-gray-700 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => onNavigate({ name: 'login' })} className="text-gray-700 hover:bg-gray-200 font-bold py-2 px-4 rounded-lg text-sm">
                    Log In
                  </button>
                  <button onClick={() => onNavigate({ name: 'register' })} className="ml-2 bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded-lg text-sm">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-300"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <XIcon className="block h-6 w-6" /> : <DocumentTextIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink key={link.name} page={link.page}>{link.name}</NavLink>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-2">
              {user ? (
                 <>
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate({name: 'profile'}); setIsMobileMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200">Your Profile</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate({name: 'dashboard'}); setIsMobileMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200">Dashboard</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); logout(); setIsMobileMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200">Sign out</a>
                </>
              ) : (
                <>
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate({name: 'login'}); setIsMobileMenuOpen(false); }} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200">Log In</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); onNavigate({name: 'register'}); setIsMobileMenuOpen(false); }} className="block w-full text-left bg-primary text-white px-3 py-2 rounded-md text-base font-medium">Sign Up</a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
