import React from 'react';
import { ResumeData, TemplateCategory } from './types';
import { v4 as uuidv4 } from 'uuid';

// Import all template components
import { ClassicTemplate } from './components/templates/ClassicTemplate';
import { CorporateTemplate } from './components/templates/CorporateTemplate';
import { CreativeTemplate } from './components/templates/CreativeTemplate';
import { DataDrivenTemplate } from './components/templates/DataDrivenTemplate';
import { ExecutiveTemplate } from './components/templates/ExecutiveTemplate';
import { GeographicTemplate } from './components/templates/GeographicTemplate';
import { InfographicTemplate } from './components/templates/InfographicTemplate';
import { MinimalistTemplate } from './components/templates/MinimalistTemplate';
import { ModernTemplate } from './components/templates/ModernTemplate';
import { SwissTemplate } from './components/templates/SwissTemplate';
import { TechTemplate } from './components/templates/TechTemplate';
import { TimelineTemplate } from './components/templates/TimelineTemplate';
import { TwoToneTemplate } from './components/templates/TwoToneTemplate';
import { AcademicTemplate } from './components/templates/AcademicTemplate';
import { BoldHeaderTemplate } from './components/templates/BoldHeaderTemplate';
import { GridTemplate } from './components/templates/GridTemplate';


export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    name: 'Zidan Ahmed',
    title: 'Senior Software Engineer',
    email: 'zidan.ahmed@example.com',
    phone: '(123) 456-7890',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/zidan.dev',
    website: 'zidan.dev',
    summary: 'Innovative and results-driven Senior Software Engineer with 8+ years of experience in designing and scaling web applications. Proficient in React, Node.js, and cloud technologies. Passionate about creating intuitive user experiences and efficient backend solutions.',
    photo: '',
  },
  experience: [
    {
      id: uuidv4(),
      title: 'Senior Software Engineer',
      company: 'Innovate Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: '- Led the development of a new customer-facing dashboard using React and Redux, improving user engagement by 25%.\n- Designed and implemented a microservices-based backend with Node.js and Docker, enhancing system scalability and reducing latency by 40%.\n- Mentored junior engineers, conducting code reviews and promoting best practices in software development.',
    },
    {
      id: uuidv4(),
      title: 'Software Engineer',
      company: 'TechFlow Co.',
      location: 'Palo Alto, CA',
      startDate: 'Jun 2016',
      endDate: 'Dec 2019',
      description: '- Developed and maintained features for a high-traffic e-commerce platform, contributing to a 15% increase in annual revenue.\n- Collaborated with cross-functional teams to define project requirements and deliver high-quality software solutions.',
    },
     {
      id: uuidv4(),
      title: 'Junior Developer',
      company: 'Digital Start LLC',
      location: 'Mountain View, CA',
      startDate: 'May 2014',
      endDate: 'May 2016',
      description: '- Assisted in the development of client websites using HTML, CSS, and JavaScript.\n- Contributed to the migration of a legacy system to a modern JavaScript framework.',
    },
  ],
  education: [
    {
      id: uuidv4(),
      institution: 'Stanford University',
      degree: 'Master of Science',
      fieldOfStudy: 'Computer Science',
      startDate: 'Sep 2014',
      endDate: 'May 2016',
    },
     {
      id: uuidv4(),
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: 'Sep 2010',
      endDate: 'May 2014',
    },
  ],
  skills: [
    { id: uuidv4(), name: 'JavaScript (ES6+)' },
    { id: uuidv4(), name: 'TypeScript' },
    { id: uuidv4(), name: 'React & Redux' },
    { id: uuidv4(), name: 'Node.js & Express' },
    { id: uuidv4(), name: 'Python' },
    { id: uuidv4(), name: 'AWS & Docker' },
    { id: uuidv4(), name: 'SQL & NoSQL' },
    { id: uuidv4(), name: 'CI/CD' },
  ],
  projects: [
    {
      id: uuidv4(),
      name: 'Portfolio Website',
      description: 'A personal portfolio website built with Next.js and Tailwind CSS to showcase my projects and skills.',
      url: 'zidan.dev'
    },
    {
      id: uuidv4(),
      name: 'E-commerce Analytics Dashboard',
      description: 'An internal tool for visualizing sales data and customer behavior, built with React and D3.js.',
      url: 'github.com/zidan/analytics-dashboard'
    },
  ],
  languages: [
    { id: uuidv4(), name: 'English (Native)' },
    { id: uuidv4(), name: 'Spanish (Professional)' },
  ],
};

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
    {
        name: 'Modern & Clean',
        templates: [
            { id: 'modern', name: 'Modern', component: ModernTemplate },
            { id: 'tech', name: 'Tech', component: TechTemplate },
            { id: 'minimalist', name: 'Minimalist', component: MinimalistTemplate },
            { id: 'swiss', name: 'Swiss', component: SwissTemplate },
            { id: 'grid', name: 'Grid-Based', component: GridTemplate },
            { id: 'bold-header', name: 'Bold Header', component: BoldHeaderTemplate },
        ],
    },
    {
        name: 'Professional & Corporate',
        templates: [
            { id: 'executive', name: 'Executive', component: ExecutiveTemplate },
            { id: 'corporate', name: 'Corporate', component: CorporateTemplate },
            { id: 'data-driven', name: 'Data-Driven', component: DataDrivenTemplate },
            { id: 'corporate-blue', name: 'Corporate Blue', component: CorporateTemplate }, // Variation
            { id: 'classic-serif', name: 'Classic Serif', component: ClassicTemplate },
        ],
    },
    {
        name: 'Creative & Visual',
        templates: [
            { id: 'creative', name: 'Creative', component: CreativeTemplate },
            { id: 'infographic', name: 'Infographic', component: InfographicTemplate },
            { id: 'geographic', name: 'Geographic', component: GeographicTemplate },
            { id: 'timeline', name: 'Timeline', component: TimelineTemplate },
            { id: 'two-tone', name: 'Two-Tone', component: TwoToneTemplate },
            { id: 'creative-dark', name: 'Creative Dark', component: CreativeTemplate }, // Variation
        ],
    },
    {
        name: 'Formal & Academic',
        templates: [
            { id: 'classic', name: 'Classic', component: ClassicTemplate },
            { id: 'academic', name: 'Academic CV', component: AcademicTemplate },
            { id: 'timeline-formal', name: 'Formal Timeline', component: TimelineTemplate }, // Variation
            { id: 'executive-plain', name: 'Plain Executive', component: ExecutiveTemplate }, // Variation
        ]
    }
];
