
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">CVBuilderBD</h1>
        <p className="text-sm text-gray-500">AI-Powered Resume Creation</p>
      </div>
    </header>
  );
};
