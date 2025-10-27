
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  photo?: string; // base64 string
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

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  languages: Skill[];
}

export interface Template {
  id: string;
  name: string;
  imageUrl: string;
  component: React.FC<{ resumeData: ResumeData, forPdf?: boolean }>;
}

export interface TemplateCategory {
  name: string;
  templates: Template[];
}
