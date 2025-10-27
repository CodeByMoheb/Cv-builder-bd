import React from 'react';
import { ResumeData, TemplateCategory } from './types';
import { ModernTemplate } from './components/templates/ModernTemplate';
import { ExecutiveTemplate } from './components/templates/ExecutiveTemplate';
import { MinimalistTemplate } from './components/templates/MinimalistTemplate';
import { CreativeTemplate } from './components/templates/CreativeTemplate';

export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: 'Zidan Ahmed',
    title: 'Senior Software Engineer',
    email: 'zidan.ahmed@example.com',
    phone: '(123) 456-7890',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/zidanahmed',
    website: 'zidan.dev',
    summary: 'Innovative and results-driven Senior Software Engineer with 8+ years of experience in developing and scaling web applications. Proficient in React, Node.js, and cloud technologies. Passionate about creating intuitive user experiences and efficient backend systems.',
    photo: '',
  },
  experience: [
    {
      id: 'exp1',
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: '- Led the development of a new customer-facing dashboard using React and TypeScript, improving user engagement by 25%.\n- Architected and implemented a microservices-based backend with Node.js and Express, enhancing system scalability and reducing latency by 40%.\n- Mentored junior engineers, conducting code reviews and promoting best practices in software development.'
    },
    {
      id: 'exp2',
      title: 'Software Engineer',
      company: 'Innovate Co.',
      location: 'Palo Alto, CA',
      startDate: 'Jun 2016',
      endDate: 'Dec 2019',
      description: '- Developed and maintained features for a high-traffic e-commerce platform, contributing to a 15% increase in annual revenue.\n- Collaborated with cross-functional teams to define project requirements and deliver high-quality software solutions.'
    }
  ],
  education: [
    {
      id: 'edu1',
      institution: 'Stanford University',
      degree: 'Master of Science',
      fieldOfStudy: 'Computer Science',
      startDate: 'Sep 2014',
      endDate: 'May 2016'
    }
  ],
  skills: [
    { id: 'skill1', name: 'JavaScript (ES6+)' },
    { id: 'skill2', name: 'TypeScript' },
    { id: 'skill3', name: 'React & Redux' },
    { id: 'skill4', name: 'Node.js & Express' },
    { id: 'skill5', name: 'Python' },
    { id: 'skill6', name: 'AWS & Docker' },
    { id: 'skill7', name: 'SQL & NoSQL' },
  ],
  projects: [
    {
        id: 'proj1',
        name: 'Portfolio Website',
        description: 'Personal portfolio website built with Next.js and Tailwind CSS to showcase my projects and skills.',
        url: 'zidan.dev'
    }
  ],
  languages: [
    {id: 'lang1', name: 'English (Native)'},
    {id: 'lang2', name: 'Spanish (Professional)'},
  ],
};

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  {
    name: 'Engineer',
    templates: [
      { id: 'modern', name: 'Modern', imageUrl: 'https://picsum.photos/seed/modern/400/565', component: ModernTemplate },
      { id: 'executive', name: 'Executive', imageUrl: 'https://picsum.photos/seed/executive/400/565', component: ExecutiveTemplate },
      { id: 'minimalist', name: 'Minimalist', imageUrl: 'https://picsum.photos/seed/minimalist/400/565', component: MinimalistTemplate },
      { id: 'creative', name: 'Creative', imageUrl: 'https://picsum.photos/seed/creative/400/565', component: CreativeTemplate },
      { id: 'tech-sphere', name: 'Tech Sphere', imageUrl: 'https://picsum.photos/seed/tech2/400/565', component: ModernTemplate },
      { id: 'code-master', name: 'Code Master', imageUrl: 'https://picsum.photos/seed/tech3/400/565', component: ExecutiveTemplate },
      { id: 'data-driven', name: 'Data Driven', imageUrl: 'https://picsum.photos/seed/data/400/565', component: MinimalistTemplate },
      { id: 'innovator', name: 'Innovator', imageUrl: 'https://picsum.photos/seed/innovator/400/565', component: CreativeTemplate },
    ]
  },
  {
    name: 'Corporate/Business',
    templates: [
      { id: 'corp-blue', name: 'Corporate Blue', imageUrl: 'https://picsum.photos/seed/corp1/400/565', component: ExecutiveTemplate },
      { id: 'clean-lines', name: 'Clean Lines', imageUrl: 'https://picsum.photos/seed/corp2/400/565', component: MinimalistTemplate },
      { id: 'professional', name: 'Professional', imageUrl: 'https://picsum.photos/seed/corp3/400/565', component: ModernTemplate },
      { id: 'business-sharp', name: 'Business Sharp', imageUrl: 'https://picsum.photos/seed/sharp/400/565', component: ExecutiveTemplate },
      { id: 'consultant', name: 'Consultant', imageUrl: 'https://picsum.photos/seed/consultant/400/565', component: MinimalistTemplate },
    ]
  },
   {
    name: 'General',
    templates: [
      { id: 'classic', name: 'Classic', imageUrl: 'https://picsum.photos/seed/gen1/400/565', component: MinimalistTemplate },
      { id: 'standard', name: 'Standard', imageUrl: 'https://picsum.photos/seed/gen2/400/565', component: ModernTemplate },
      { id: 'universal', name: 'Universal', imageUrl: 'https://picsum.photos/seed/universal/400/565', component: CreativeTemplate },
    ]
  }
];