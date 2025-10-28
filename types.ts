import React from 'react';

export interface PersonalInfo {
  name: string;
  title:string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  photo: string; // This will store the base64 data URL
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface Language {
  id: string;
  name: string;
}

export interface CustomizationOptions {
  colors: {
    primary: string;
    text: string;
    background: string;
  };
  font: string;
  sectionOrder: Array<'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'languages'>;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  customization: CustomizationOptions;
}

export interface Template {
  id: string;
  name: string;
  component?: React.FC<{ resumeData: ResumeData }>; // Optional for LaTeX templates
  previewImageUrl?: string; // For all templates
  hasPhoto?: boolean;
  type: 'react' | 'latex'; // Distinguish template type
  latexFileContent?: string; // For LaTeX templates on backend
  // FIX: Added optional category for admin management UI.
  category?: string;
}

export interface TemplateCategory {
  name: string;
  templates: Template[];
}

export interface SavedResume {
  id: string;
  userId: string;
  name: string;
  resumeData: ResumeData;
  templateId: string;
  lastModified: number;
}

export interface User {
    id: string;
    email: string;
    // Password is not sent to the frontend
    role: 'user' | 'admin';
    name?: string;
    photo?: string; // base64 data URL
    createdAt?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Full markdown/html content
  imageUrl: string;
  author: string;
  authorAvatar: string;
  category: string;
  createdAt: string; // ISO 8601 date string
  updatedAt?: string;
}

export interface AdminStats {
  totalUsers: number;
  totalResumes: number;
  totalBlogPosts: number;
  totalPayments: number;
  totalRevenue: number;
}

export interface Payment {
  id: string;
  userId: string;
  userEmail: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'pending' | 'failed';
  transactionId: string;
  createdAt: string;
}
