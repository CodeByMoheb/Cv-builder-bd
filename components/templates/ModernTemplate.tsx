
import React from 'react';
import { ResumeData } from '../../types';

export const ModernTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { customization, ...data } = resumeData;
  const { colors, font } = customization;
  const { personalInfo, experience, education, skills, projects, languages } = data;

  const sectionsMap: Record<string, React.ReactNode> = {
    summary: (
      <p key="summary" className="mb-6 border-b pb-4" style={{borderColor: '#e5e7eb'}}>{personalInfo.summary}</p>
    ),
    experience: (
      <section key="experience">
        <h3 className="text-lg font-bold border-b-2 mb-4 pb-1" style={{ color: colors.primary, borderColor: colors.primary }}>Experience</h3>
        {experience.map(exp => (
          <div key={exp.id} className="mb-4">
            <h4 className="font-bold text-md">{exp.title}</h4>
            <p className="font-semibold">{exp.company} | {exp.startDate} - {exp.endDate}</p>
            <ul className="list-disc list-inside mt-2 whitespace-pre-wrap">
              {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
            </ul>
          </div>
        ))}
      </section>
    ),
    projects: (
      <section key="projects">
        <h3 className="text-lg font-bold border-b-2 mt-6 mb-4 pb-1" style={{ color: colors.primary, borderColor: colors.primary }}>Projects</h3>
        {projects.map(proj => (
            <div key={proj.id} className="mb-4">
                <h4 className="font-bold text-md">{proj.name}</h4>
                <p>{proj.description}</p>
            </div>
        ))}
      </section>
    ),
    education: (
      <section key="education">
        <h3 className="text-lg font-bold border-b-2 mb-4 pb-1" style={{ color: colors.primary, borderColor: colors.primary }}>Education</h3>
        {education.map(edu => (
          <div key={edu.id} className="mb-4">
            <h4 className="font-bold text-md">{edu.institution}</h4>
            <p>{edu.degree}</p>
            <p>{edu.fieldOfStudy}</p>
          </div>
        ))}
      </section>
    ),
    skills: (
      <section key="skills">
        <h3 className="text-lg font-bold border-b-2 mt-6 mb-4 pb-1" style={{ color: colors.primary, borderColor: colors.primary }}>Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{skill.name}</span>
          ))}
        </div>
      </section>
    ),
    languages: (
       <section key="languages">
        <h3 className="text-lg font-bold border-b-2 mt-6 mb-4 pb-1" style={{ color: colors.primary, borderColor: colors.primary }}>Languages</h3>
        <ul>
           {languages.map(lang => <li key={lang.id}>{lang.name}</li>)}
        </ul>
      </section>
    ),
  };
  
  const mainSections = ['summary', 'experience', 'projects'];
  const sidebarSections = ['education', 'skills', 'languages'];

  return (
    <div className="p-8 font-sans text-sm" style={{ backgroundColor: colors.background, color: colors.text, fontFamily: font }}>
      <div className="flex items-center mb-8">
        {personalInfo.photo && <img src={personalInfo.photo} alt="Profile" className="w-24 h-24 rounded-full mr-6 object-cover" />}
        <div>
          <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
          <h2 className="text-xl font-light" style={{color: colors.primary}}>{personalInfo.title}</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
           {customization.sectionOrder.map(key => mainSections.includes(key) ? sectionsMap[key] : null)}
        </div>
        
        <div className="col-span-1">
          <h3 className="text-lg font-bold border-b-2 mb-4 pb-1" style={{ color: colors.primary, borderColor: colors.primary }}>Contact</h3>
          <ul className="mb-6">
            <li>{personalInfo.email}</li>
            <li>{personalInfo.phone}</li>
            <li>{personalInfo.location}</li>
            <li>{personalInfo.linkedin}</li>
            <li>{personalInfo.website}</li>
          </ul>

          {customization.sectionOrder.map(key => sidebarSections.includes(key) ? sectionsMap[key] : null)}
        </div>
      </div>
    </div>
  );
};