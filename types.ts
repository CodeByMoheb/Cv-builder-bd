// FIX: Import React to provide the React namespace for types like React.FC.
import React from 'react';

// FIX: Added type definitions to resolve module and type errors.
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
  component: React.FC<{ resumeData: ResumeData }>;
  hasPhoto?: boolean;
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
    password: string; // In a real app, this would be a hash
    role: 'user' | 'admin';
    name?: string;
    photo?: string; // base64 data URL
}