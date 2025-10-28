import React from 'react';
import { SparklesIcon, DocumentTextIcon, PencilIcon, DownloadIcon, QuoteIcon } from '../components/ui/Icons';
import FaqAccordion from '../components/FaqAccordion';

interface HomePageProps {
    onNavigate: () => void;
}

// Data for new sections
const howItWorksSteps = [
    {
        icon: <DocumentTextIcon className="w-10 h-10 text-primary" />,
        title: '1. Pick a Template',
        description: 'Choose from a variety of professionally designed, ATS-friendly resume templates to get started.',
    },
    {
        icon: <PencilIcon className="w-10 h-10 text-primary" />,
        title: '2. Fill in Details',
        description: 'Easily input your information. Our AI assistant can help you write powerful, impactful descriptions.',
    },
    {
        icon: <DownloadIcon className="w-10 h-10 text-primary" />,
        title: '3. Download Your CV',
        description: 'Instantly generate and download a high-quality PDF of your polished resume, ready to send to employers.',
    },
];

const testimonials = [
    {
        quote: "CVBuilderBD made resume writing a breeze! The templates are stunning, and the AI suggestions helped me articulate my achievements perfectly. I landed three interviews within a week!",
        name: 'Sarah L.',
        title: 'Marketing Manager',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    },
    {
        quote: "As a recent graduate, I was struggling to create a professional-looking CV. This tool is a lifesaver. The interface is intuitive, and I had my resume ready in 20 minutes.",
        name: 'David K.',
        title: 'Computer Science Graduate',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    },
    {
        quote: "The best resume builder I've ever used. The payment was simple, and the quality of the final PDF is outstanding. Highly recommended for any serious job seeker.",
        name: 'Fatima R.',
        title: 'Project Manager',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    },
];

const faqItems = [
    {
        question: 'Is CVBuilderBD free to use?',
        answer: 'You can create your resume and explore all our features for free. A small one-time payment is required to download the final high-quality PDF. There are no recurring subscriptions or hidden fees.',
    },
    {
        question: 'Are the templates Applicant Tracking System (ATS) friendly?',
        answer: 'Yes! All our templates are designed and tested to be fully compatible with modern ATS software, ensuring your resume gets seen by recruiters.',
    },
    {
        question: 'Can I edit my resume after downloading it?',
        answer: 'Absolutely. You can return to our editor at any time to make changes to your resume. Your progress is saved in your browser, allowing for easy updates and multiple versions.',
    },
     {
        question: 'How does the AI assistance work?',
        answer: 'Our platform uses the powerful Google Gemini AI to help you generate professional summaries, refine job descriptions, and even edit your profile photo, making your resume stand out.',
    },
];

const socialProofLogos = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meta-Logo.png/1200px-Meta-Logo.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png",
];


// Reusable Section component for consistent styling
const Section: React.FC<{ title: string; subtitle: string; children: React.ReactNode, className?: string }> = ({ title, subtitle, children, className }) => (
    <section className={`py-16 md:py-24 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-dark">{title}</h2>
                <p className="mt-3 text-md text-muted max-w-2xl mx-auto">{subtitle}</p>
            </div>
            {children}
        </div>
    </section>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    return (
        <div className="animate-fadeIn">
            {/* Hero Section */}
            <div className="text-center flex flex-col items-center justify-center py-20 md:py-32">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-dark mb-4 leading-tight">
                    Create Your Professional CV in <span className="text-primary">Minutes</span>
                </h1>
                <p className="text-base md:text-lg text-muted max-w-3xl mx-auto mb-8">
                    Build a job-winning resume that stands out. Our AI-powered builder makes it fast, easy, and effective. ATS-friendly templates included.
                </p>
                <button
                    onClick={onNavigate}
                    className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-lg flex items-center gap-2 transform transition-transform duration-300 hover:scale-105 hover:bg-opacity-90 shadow-lg hover:shadow-xl"
                >
                    Create Your CV Now
                </button>
            </div>
            
            {/* Social Proof Section */}
            <div className="py-8">
                <div className="max-w-5xl mx-auto px-4 md:px-8">
                    <p className="text-center text-sm font-semibold text-gray-500 mb-4">TRUSTED BY PROFESSIONALS AT TOP COMPANIES</p>
                    <div className="flex justify-center items-center gap-8 flex-wrap">
                        {socialProofLogos.map((logo, index) => (
                            <img key={index} src={logo} alt={`Company logo ${index + 1}`} className="h-6 opacity-60" />
                        ))}
                    </div>
                </div>
            </div>


            {/* How It Works Section */}
            <Section
                title="How It Works"
                subtitle="Create your perfect resume in three simple, straightforward steps."
                className="bg-secondary"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {howItWorksSteps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md animate-slideUp border" style={{animationDelay: `${200 * (index + 1)}ms`}}>
                            <div className="mb-4 bg-primary/10 p-4 rounded-full">{step.icon}</div>
                            <h3 className="text-xl font-bold text-dark mb-2">{step.title}</h3>
                            <p className="text-muted text-sm">{step.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Testimonials Section */}
            <Section
                title="What Our Users Say"
                subtitle="Thousands of job seekers have successfully built their careers with our help."
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                     {testimonials.map((testimonial, index) => (
                         <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-start text-left border transform hover:-translate-y-2 transition-transform duration-300">
                             <QuoteIcon className="w-8 h-8 text-gray-200 mb-4" />
                             <p className="text-muted italic mb-4 flex-grow">"{testimonial.quote}"</p>
                             <div className="flex items-center gap-3">
                                 <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border-2 border-primary" />
                                 <div>
                                     <p className="font-bold text-dark">{testimonial.name}</p>
                                     <p className="text-sm text-muted">{testimonial.title}</p>
                                 </div>
                             </div>
                         </div>
                     ))}
                </div>
            </Section>
            
            {/* FAQ Section */}
            <Section
                title="Frequently Asked Questions"
                subtitle="Have questions? We've got answers. Here are some of the most common queries from our users."
                className="bg-secondary"
            >
                <div className="max-w-3xl mx-auto">
                    <FaqAccordion items={faqItems} />
                </div>
            </Section>

             {/* Final CTA Section */}
            <section className="text-center py-16 md:py-24">
                 <h2 className="text-3xl md:text-4xl font-bold text-dark">Ready to Land Your Dream Job?</h2>
                 <p className="mt-3 text-md text-muted max-w-2xl mx-auto mb-8">
                    Start building a resume that showcases your true potential.
                 </p>
                 <button
                    onClick={onNavigate}
                    className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-lg flex items-center gap-2 transform transition-transform duration-300 hover:scale-105 hover:bg-opacity-90 shadow-lg hover:shadow-xl"
                >
                    Create My Resume Now
                </button>
            </section>
        </div>
    );
};

export default HomePage;