import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white mt-16">
      <div className="max-w-7xl mx-auto py-12 px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand and Description */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-2">CVBuilderBD</h2>
            <p className="text-sm text-gray-400 max-w-md">
              The ultimate AI-powered tool to create professional, ATS-friendly resumes in minutes. Build your career with the perfect CV.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Templates</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col sm:flex-row justify-between items-center text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CVBuilderBD. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">Powered by Gemini AI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;