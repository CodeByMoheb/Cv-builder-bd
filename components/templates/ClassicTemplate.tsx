
import React from 'react';
import { ResumeData } from '../../types';

export const ClassicTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects, languages } = resumeData;

  return (
    <div className="bg-white p-10 font-serif text-gray-900">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-widest">{personalInfo.name}</h1>
        <p className="text-lg text-gray-700 mt-1">{personalInfo.title}</p>
        <div className="flex justify-center gap-x-4 mt-4 text-sm text-gray-600 flex-wrap">
          <span>{personalInfo.email}</span>
          <span>|</span>
          <span>{personalInfo.phone}</span>
          <span>|</span>
          <span>{personalInfo.location}</span>
          {personalInfo.linkedin && (
            <>
              <span>|</span>
              <span>{personalInfo.linkedin}</span>
            </>
          )}
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-3">Summary</h2>
        <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-3">Experience</h2>
        {experience.map(exp => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold">{exp.title}</h3>
              <span className="text-sm font-light text-gray-600">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="text-md font-medium text-gray-700">{exp.company} | {exp.location}</p>
            <ul className="mt-1 list-disc list-inside text-sm text-gray-700 whitespace-pre-wrap">
              {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
            </ul>
          </div>
        ))}
      </section>
      
      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-3">Education</h2>
        {education.map(edu => (
          <div key={edu.id} className="mb-3">
             <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold">{edu.institution}</h3>
                <span className="text-sm font-light text-gray-600">{edu.startDate} - {edu.endDate}</span>
            </div>
            <p className="text-md text-gray-700">{edu.degree}, {edu.fieldOfStudy}</p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-3">Skills</h2>
        <p className="text-sm leading-relaxed">{skills.map(skill => skill.name).join(' • ')}</p>
      </section>

      {projects.length > 0 && (
         <section className="mb-6">
            <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-3">Projects</h2>
            {projects.map(proj => (
            <div key={proj.id} className="mb-3">
                <h3 className="text-lg font-semibold">{proj.name}</h3>
                <p className="text-sm text-gray-700">{proj.description}</p>
            </div>
            ))}
        </section>
      )}

      {languages.length > 0 && (
        <section>
            <h2 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-3">Languages</h2>
            <p className="text-sm leading-relaxed">{languages.map(lang => lang.name).join(', ')}</p>
        </section>
      )}
    </div>
  );
};
