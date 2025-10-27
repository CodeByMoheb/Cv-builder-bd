
import React from 'react';
import { ResumeData } from '../../types';

export const TechTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects, languages } = resumeData;

  return (
    <div className="bg-white p-8 font-sans text-sm text-gray-800">
      <header className="flex justify-between items-start mb-6 pb-4 border-b-2 border-gray-200">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 font-mono">{personalInfo.name}</h1>
          <h2 className="text-lg font-light text-primary">{personalInfo.title}</h2>
        </div>
        <div className="text-right text-xs text-gray-600">
          <div>{personalInfo.email}</div>
          <div>{personalInfo.phone}</div>
          <div>{personalInfo.location}</div>
          <div>{personalInfo.linkedin}</div>
          <div>{personalInfo.website}</div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <main className="col-span-8">
          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 font-mono">Summary</h3>
            <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
          </section>

          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 font-mono">Experience</h3>
            {experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-md">{exp.title}</h4>
                  <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className="font-semibold text-gray-700 text-sm">{exp.company}</p>
                <ul className="list-disc list-inside mt-2 text-gray-600 whitespace-pre-wrap text-xs">
                  {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 font-mono">Projects</h3>
            {projects.map(proj => (
              <div key={proj.id} className="mb-4">
                <h4 className="font-bold text-md">{proj.name}</h4>
                <p className="text-xs text-gray-600">{proj.description}</p>
              </div>
            ))}
          </section>
        </main>
        
        <aside className="col-span-4">
          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 font-mono">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">{skill.name}</span>
              ))}
            </div>
          </section>

          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 font-mono">Education</h3>
            {education.map(edu => (
              <div key={edu.id} className="mb-4">
                <h4 className="font-bold text-md">{edu.degree}</h4>
                <p className="text-sm text-gray-700">{edu.institution}</p>
                <p className="text-xs text-gray-600">{edu.fieldOfStudy}</p>
              </div>
            ))}
          </section>
          
          {languages.length > 0 && (
            <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3 font-mono">Languages</h3>
                <ul className="text-sm text-gray-600">
                    {languages.map(lang => <li key={lang.id}>{lang.name}</li>)}
                </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
};
