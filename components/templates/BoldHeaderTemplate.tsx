import React from 'react';
import { ResumeData } from '../../types';

export const BoldHeaderTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-white p-8 font-sans text-gray-800 text-sm">
      <header className="mb-8">
        <h1 className="text-7xl font-extrabold text-gray-900 leading-none">{personalInfo.name.split(' ')[0]}</h1>
        <h1 className="text-7xl font-extrabold text-gray-900 leading-none mb-2">{personalInfo.name.split(' ').slice(1).join(' ')}</h1>
        <p className="text-xl font-light text-primary border-b-2 border-gray-200 pb-2">{personalInfo.title}</p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <main className="col-span-8">
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Summary</h2>
            <p className="leading-relaxed">{personalInfo.summary}</p>
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
                <ul className="list-disc list-inside mt-1 text-xs text-gray-700 whitespace-pre-wrap">
                  {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                </ul>
              </div>
            ))}
          </section>
           <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Projects</h2>
            {projects.map(proj => (
            <div key={proj.id} className="mb-2">
                <h3 className="text-md font-semibold">{proj.name}</h3>
                <p className="text-xs text-gray-600">{proj.description}</p>
            </div>
            ))}
        </section>
        </main>
        <aside className="col-span-4">
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Contact</h2>
            <ul className="text-xs space-y-1">
              <li>{personalInfo.email}</li>
              <li>{personalInfo.phone}</li>
              <li>{personalInfo.location}</li>
              <li>{personalInfo.linkedin}</li>
            </ul>
          </section>
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Education</h2>
            {education.map(edu => (
            <div key={edu.id} className="mb-2">
                <h3 className="text-md font-semibold">{edu.institution}</h3>
                <p className="text-sm text-gray-600">{edu.degree}</p>
            </div>
            ))}
        </section>
        <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded">{skill.name}</span>
                ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};
