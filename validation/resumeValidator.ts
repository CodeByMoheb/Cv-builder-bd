// FIX: Created the content for the missing resumeValidator.ts file.
import { ResumeData } from '../types';

type ValidationErrors = {
  // FIX: Allow a single object for field errors (for personalInfo), not just a string or an array of objects.
  [K in keyof ResumeData]?: string | Record<string, unknown> | Record<string, unknown>[];
};

export const validateResumeData = (data: ResumeData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Personal Info validation
  if (!data.personalInfo.name) {
    errors.personalInfo = { ...(errors.personalInfo as object), name: 'Name is required' };
  }
  if (!data.personalInfo.email) {
    errors.personalInfo = { ...(errors.personalInfo as object), email: 'Email is required' };
  } else if (!/\S+@\S+\.\S+/.test(data.personalInfo.email)) {
    errors.personalInfo = { ...(errors.personalInfo as object), email: 'Email is invalid' };
  }
  if (!data.personalInfo.title) {
    errors.personalInfo = { ...(errors.personalInfo as object), title: 'Title is required' };
  }
  if (!data.personalInfo.summary) {
    errors.personalInfo = { ...(errors.personalInfo as object), summary: 'Summary is required' };
  }

  // Experience validation
  const experienceErrors = data.experience.map(exp => {
    const expErrors: Record<string, string> = {};
    if (!exp.title) expErrors.title = 'Title is required';
    if (!exp.company) expErrors.company = 'Company is required';
    if (!exp.startDate) expErrors.startDate = 'Start date is required';
    if (!exp.endDate) expErrors.endDate = 'End date is required';
    if (!exp.description) expErrors.description = 'Description is required';
    return expErrors;
  });

  if (experienceErrors.some(e => Object.keys(e).length > 0)) {
    errors.experience = experienceErrors;
  }
  
  // Education validation
  const educationErrors = data.education.map(edu => {
    const eduErrors: Record<string, string> = {};
    if (!edu.institution) eduErrors.institution = 'Institution is required';
    if (!edu.degree) eduErrors.degree = 'Degree is required';
    if (!edu.startDate) eduErrors.startDate = 'Start date is required';
    if (!edu.endDate) eduErrors.endDate = 'End date is required';
    return eduErrors;
  });

  if (educationErrors.some(e => Object.keys(e).length > 0)) {
    errors.education = educationErrors;
  }
  
  // Skills validation
  if (data.skills.length === 0) {
      errors.skills = 'At least one skill is required';
  } else if (data.skills.some(s => !s.name)) {
      errors.skills = 'All skills must have a name';
  }

  return errors;
};
