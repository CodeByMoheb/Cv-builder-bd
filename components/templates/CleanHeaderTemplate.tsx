import React from 'react';
import { ResumeData } from '../../types';

export const CleanHeaderTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-white p-8 font-sans text-sm text-gray-800">
      <header className="flex items-center mb-6 pb-6 border-b">
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Profile" className="w-24 h-24 rounded-full mr-6 object-cover" />
        )}
        <div className="flex-grow">
          <h1 className="text-4xl font-bold text-gray-900">{personalInfo.name}</h1>
          <p className="text-xl font-light text-primary">{personalInfo.title}</p>
        </div>
        <div className="text-right text-xs text-gray-500">
            <div>{personalInfo.email}</div>
            <div>{personalInfo.phone}</div>
            <div>{personalInfo.location}</div>
            <div>{personalInfo.linkedin}</div>
        </div>
      </header>
      
      <section className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Summary</h2>
        <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
      </section>

      <div className="grid grid-cols-12 gap-8">
        <main className="col-span-8">
          <section>
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
        </main>
        <aside className="col-span-4">
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-0.5 rounded">{skill.name}</span>
                ))}
            </div>
          </section>
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Education</h2>
            {education.map(edu => (
            <div key={edu.id} className="mb-2">
                <h3 className="text-md font-semibold">{edu.institution}</h3>
                <p className="text-sm text-gray-600">{edu.degree}, {edu.fieldOfStudy}</p>
            </div>
            ))}
        </section>
        </aside>
      </div>
    </div>
  );
};
