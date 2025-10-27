
import React from 'react';
import { SparklesIcon } from '../components/ui/Icons';

interface HomePageProps {
    onNavigate: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    return (
        <div className="text-center flex flex-col items-center justify-center py-10 md:py-20 animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-4">
                Craft Your Future, <span className="text-primary">Instantly</span>.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Build a professional, ATS-friendly resume in minutes. Our AI-powered platform helps you stand out and land your dream job.
            </p>
            <button
                onClick={onNavigate}
                className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-lg flex items-center gap-2 transform transition-transform duration-300 hover:scale-105 hover:bg-blue-700 shadow-lg hover:shadow-xl"
            >
                <SparklesIcon />
                Choose Your Template
            </button>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                <div className="p-6 bg-white rounded-lg shadow-md animate-slideUp" style={{animationDelay: '200ms'}}>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Professional Templates</h3>
                    <p className="text-gray-600">Choose from a variety of expertly designed, ATS-optimized templates for any industry.</p>
                </div>
                 <div className="p-6 bg-white rounded-lg shadow-md animate-slideUp" style={{animationDelay: '400ms'}}>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Powered Assistance</h3>
                    <p className="text-gray-600">Leverage Gemini AI to refine summaries, analyze content, and even edit your profile photo.</p>
                </div>
                 <div className="p-6 bg-white rounded-lg shadow-md animate-slideUp" style={{animationDelay: '600ms'}}>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Instant PDF Download</h3>
                    <p className="text-gray-600">Generate a high-quality PDF of your resume with a single click, ready for applications.</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
