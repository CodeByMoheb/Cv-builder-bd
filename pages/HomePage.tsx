
import React from 'react';
import FaqAccordion from '../components/FaqAccordion';
import { SparklesIcon, DocumentTextIcon, CheckIcon } from '../components/ui/Icons';

interface HomePageProps {
  onNavigate: () => void;
}

const FAQ_ITEMS = [
  {
    question: "Is CVBuilderBD's resume builder free to use?",
    answer: "You can create, edit, and save your resume for free. We charge a small, one-time fee of 10 BDT for each PDF download to cover our operational costs and continue improving the platform.",
  },
  {
    question: "Are the resume templates Applicant Tracking System (ATS) friendly?",
    answer: "Yes! All our templates are designed with modern ATS requirements in mind. They use clean, readable fonts and a logical structure to ensure your resume gets past the bots and into the hands of recruiters.",
  },
  {
    question: "Can I customize the templates?",
    answer: "Absolutely. Our editor allows you to change colors, fonts, and re-order sections to match your personal style and the industry you're applying to.",
  },
  {
    question: "How does the AI analysis work?",
    answer: "Our AI, powered by Google's Gemini Pro, analyzes your resume content for clarity, impact, and best practices. It provides actionable suggestions, like using stronger action verbs and quantifying achievements, to make your resume more effective.",
  }
];

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 md:space-y-24 animate-fadeIn">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-dark tracking-tight">
          Build Your Professional <span className="text-primary">Resume</span> in Minutes
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted">
          Create a standout, ATS-friendly resume with our AI-powered builder and professionally designed templates.
        </p>
        <div className="mt-8">
          <button
            onClick={onNavigate}
            className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition-transform duration-200 hover:scale-105 shadow-lg"
          >
            Create My Resume Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark">Why Choose CVBuilderBD?</h2>
          <p className="mt-2 text-muted">Everything you need to create the perfect resume.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <DocumentTextIcon className="w-8 h-8"/>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-dark">Professional Templates</h3>
            <p className="mt-2 text-sm text-muted">Choose from a variety of ATS-friendly templates designed by experts.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border">
             <div className="flex justify-center mb-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <SparklesIcon className="w-8 h-8"/>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-dark">AI-Powered Assistance</h3>
            <p className="mt-2 text-sm text-muted">Get smart suggestions and analysis to improve your resume's content and impact.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border">
             <div className="flex justify-center mb-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <CheckIcon className="w-8 h-8"/>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-dark">Easy & Intuitive</h3>
            <p className="mt-2 text-sm text-muted">Our step-by-step editor makes the resume building process simple and fast.</p>
          </div>
        </div>
      </section>
      
       {/* FAQ Section */}
      <section className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark">Frequently Asked Questions</h2>
            <p className="mt-2 text-muted">Have questions? We've got answers.</p>
        </div>
        <FaqAccordion items={FAQ_ITEMS} />
      </section>

      {/* Final CTA */}
      <section className="text-center bg-white p-12 rounded-lg shadow-lg border">
         <h2 className="text-3xl font-bold text-dark">Ready to Land Your Dream Job?</h2>
         <p className="mt-2 text-muted max-w-xl mx-auto">A great resume is the first step. Let's build yours today and unlock your career potential.</p>
         <div className="mt-8">
            <button
                onClick={onNavigate}
                className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-opacity-90 transition-transform duration-200 hover:scale-105 shadow-lg"
            >
                Get Started for Free
            </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
