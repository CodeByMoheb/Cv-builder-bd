
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12 shadow-inner">
      <div className="container mx-auto py-6 px-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} CVBuilderBD. All Rights Reserved.</p>
        <p className="text-sm">Powered by Gemini AI</p>
      </div>
    </footer>
  );
};

export default Footer;
