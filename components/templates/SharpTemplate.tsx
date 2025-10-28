import React from 'react';
import { ResumeData } from '../../types';

export const SharpTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">{title}</h2>
  );

  return (
    <div className="bg-white p-8 font-sans text-gray-800 text-sm">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4">
          {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Profile" className="w-full aspect-square object-cover mb-4" />
          )}
          <section className="mb-6">
            <SectionHeader title="Contact" />
            <ul className="text-xs space-y-1 text-gray-600">
              <li>{personalInfo.email}</li>
              <li>{personalInfo.phone}</li>
              <li>{personalInfo.location}</li>
              <li>{personalInfo.linkedin}</li>
            </ul>
          </section>
           <section className="mb-6">
            <SectionHeader title="Skills" />
            <ul className="text-xs space-y-1 text-gray-600">
                {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
            </ul>
          </section>
          <section>
            <SectionHeader title="Education" />
            {education.map(edu => (
              <div key={edu.id} className="mb-3 text-xs">
                <h3 className="font-semibold">{edu.institution}</h3>
                <p className="text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="col-span-8">
          <header className="mb-6">
            <h1 className="text-5xl font-extrabold">{personalInfo.name}</h1>
            <p className="text-xl text-gray-600">{personalInfo.title}</p>
          </header>
          
          <section className="mb-6">
            <SectionHeader title="Summary" />
            <p className="text-xs leading-relaxed">{personalInfo.summary}</p>
          </section>
          
          <section className="mb-6">
            <SectionHeader title="Experience" />
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
            <SectionHeader title="Projects" />
            {projects.map(proj => (
              <div key={proj.id} className="mb-2">
                <h3 className="text-md font-semibold">{proj.name}</h3>
                <p className="text-xs text-gray-600">{proj.description}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};
