import React from 'react';
import { PageState } from '../../App';
import { UsersIcon, DocumentTextIcon, SparklesIcon, XIcon } from '../ui/Icons'; // Assuming you have these icons

interface AdminSidebarProps {
  onNavigate: (page: PageState) => void;
  activeSection: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onNavigate, activeSection }) => {
  const navItems = [
    { name: 'Overview', section: 'overview', icon: <SparklesIcon className="w-5 h-5" /> },
    { name: 'Users', section: 'users', icon: <UsersIcon className="w-5 h-5" /> },
    { name: 'Templates', section: 'templates', icon: <DocumentTextIcon className="w-5 h-5" /> },
    { name: 'Blog', section: 'blog', icon: <PencilIcon className="w-5 h-5" /> },
    { name: 'Payments', section: 'payments', icon: <BkashIcon className="w-5 h-5" /> },
  ];

  const linkClasses = (section: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      activeSection === section
        ? 'bg-primary text-white'
        : 'text-gray-300 hover:bg-white/20 hover:text-white'
    }`;

  return (
    <div className="w-64 bg-dark text-white h-screen flex flex-col p-4">
      <div className="flex items-center gap-2 px-2 mb-8">
        <h1 className="text-xl font-bold text-white">Admin Panel</h1>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate({ name: 'admin', params: { section: item.section } });
            }}
            className={linkClasses(item.section)}
          >
            {item.icon}
            {item.name}
          </a>
        ))}
      </nav>
      <div>
         <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate({ name: 'home' }); }}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:bg-white/20 hover:text-white"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Exit Admin
          </a>
      </div>
    </div>
  );
};

// You'll need to add PencilIcon and BkashIcon to your Icons.tsx if they aren't there.
const PencilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);
const BkashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M208.1 36.1C184.8 19.3 156.4 8 126.8 8c-67.6 0-120.4 51.5-120.4 122.2 0 44.5 20.8 83.1 53.8 104.2 2.3 1.5 5.1 1.9 7.7 1.3 2.7-.6 4.9-2.4 6.2-4.9l20.4-38.3c1-2 1.2-4.4.5-6.6-3.8-12.2-5.9-25.1-5.9-38.3 0-45.6 30.6-83.9 72.8-83.9 4.3 0 8.5.3 12.6 1 .2.1.5.1.8.2 2.5.4 4.9 1.5 6.8 3.1l29.4 25.5c1.4 1.2 3.1 1.9 4.9 1.9h.2c1.7 0 3.3-.6 4.7-1.7l14.8-11.9c2.8-2.3 3.6-6.2 1.8-9.4z" fill="#D82A7D"/>
    <path d="M126.8 248c-32.9 0-62.7-12.8-84.7-33.6 31.9 19.3 70.3 22.3 103 8.3 21-9.1 37.8-24.8 48.7-44.5l-20.4-38.3c-.7-1.3-1.8-2.3-3.1-2.9-10.4-4.8-21.7-7.4-33.5-7.4-42.2 0-72.8 38.3-72.8 83.9 0 13.2 2.1 26.1 5.9 38.3.7 2.2.5 4.6-.5 6.6l-20.4 38.3c-1.3 2.5-3.5 4.3-6.2 4.9-2.6.6-5.4.2-7.7-1.3z" fill="#E2136E"/>
  </svg>
);
const ArrowLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export default AdminSidebar;
