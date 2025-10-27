
import React from 'react';
import { ResumeData } from '../../types';

export const MinimalistTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-white p-10 font-sans text-gray-800">
      <header className="text-center border-b pb-6 mb-6">
        <h1 className="text-4xl font-extrabold tracking-wider uppercase">{personalInfo.name}</h1>
        <p className="text-md text-primary mt-1 tracking-widest">{personalInfo.title}</p>
        <div className="flex justify-center gap-x-6 gap-y-1 mt-4 text-xs text-gray-600 flex-wrap">
          <span>{personalInfo.email}</span>
          <span>&bull;</span>
          <span>{personalInfo.phone}</span>
           <span>&bull;</span>
          <span>{personalInfo.location}</span>
           <span>&bull;</span>
          <span>{personalInfo.linkedin}</span>
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Summary</h2>
        <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Experience</h2>
        {experience.map(exp => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-md font-semibold">{exp.title}</h3>
              <span className="text-xs font-mono text-gray-500">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="text-sm text-gray-600">{exp.company}</p>
            <div className="mt-1 text-xs text-gray-700 whitespace-pre-wrap pl-1">{exp.description}</div>
          </div>
        ))}
      </section>
      
      <div className="grid grid-cols-2 gap-x-8">
        <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Education</h2>
            {education.map(edu => (
            <div key={edu.id} className="mb-2">
                <h3 className="text-md font-semibold">{edu.institution}</h3>
                <p className="text-sm text-gray-600">{edu.degree}, {edu.fieldOfStudy}</p>
            </div>
            ))}
        </section>

         <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Projects</h2>
            {projects.map(proj => (
            <div key={proj.id} className="mb-2">
                <h3 className="text-md font-semibold">{proj.name}</h3>
                <p className="text-sm text-gray-600">{proj.description}</p>
            </div>
            ))}
        </section>
      </div>

      <section>
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Skills</h2>
        <p className="text-sm leading-relaxed">{skills.map(skill => skill.name).join(', ')}</p>
      </section>
    </div>
  );
};
