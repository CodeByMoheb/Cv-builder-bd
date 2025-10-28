
import React from 'react';
import { PageState } from '../App';

interface FooterProps {
  onNavigate: (page: PageState) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const links = [
    { name: 'Home', page: { name: 'home' } as PageState },
    { name: 'Templates', page: { name: 'templates' } as PageState },
    { name: 'Blog', page: { name: 'blog' } as PageState },
    { name: 'Contact', page: { name: 'contact' } as PageState },
  ];

  const handleNav = (e: React.MouseEvent, page: PageState) => {
    e.preventDefault();
    onNavigate(page);
  };
  
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <h2 className="text-2xl font-bold text-primary">CVBuilderBD</h2>
            <p className="text-gray-500 text-sm">
              Build your professional, ATS-friendly resume in minutes with our AI-powered platform.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Navigation</h3>
                <ul className="mt-4 space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a href="#" onClick={(e) => handleNav(e, link.page)} className="text-sm text-gray-600 hover:text-primary">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-primary">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-gray-600 hover:text-primary">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500 text-center">&copy; {new Date().getFullYear()} CVBuilderBD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
