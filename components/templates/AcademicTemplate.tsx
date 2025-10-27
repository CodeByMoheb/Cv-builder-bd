import React from 'react';
import { ResumeData } from '../../types';
import { AcademicCapIcon } from '../ui/Icons';

export const AcademicTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects, languages } = resumeData;

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-5">
      <h2 className="text-sm font-bold uppercase tracking-widest text-gray-700 mb-2 pb-1 border-b">{title}</h2>
      <div className="text-sm text-gray-800">{children}</div>
    </section>
  );

  return (
    <div className="bg-white p-10 font-serif text-gray-900">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
        <p className="text-md text-gray-600 mt-1">{personalInfo.title}</p>
        <div className="text-xs text-gray-500 mt-2">
          {personalInfo.location} &bull; {personalInfo.email} &bull; {personalInfo.phone} &bull; {personalInfo.linkedin}
        </div>
      </header>

      <Section title="Professional Summary">
        <p className="leading-relaxed">{personalInfo.summary}</p>
      </Section>

      <Section title="Education">
        {education.map(edu => (
          <div key={edu.id} className="mb-2">
            <p className="font-semibold">{edu.degree}, {edu.fieldOfStudy}</p>
            <p className="text-gray-700">{edu.institution}</p>
            <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
          </div>
        ))}
      </Section>

      <Section title="Professional Experience">
        {experience.map(exp => (
          <div key={exp.id} className="mb-3">
            <div className="flex justify-between">
                <p className="font-semibold">{exp.title}</p>
                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
            </div>
            <p className="text-gray-700 italic">{exp.company}, {exp.location}</p>
            <ul className="list-disc list-inside text-xs mt-1 space-y-1">
              {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Skills">
        <p className="leading-relaxed">{skills.map(s => s.name).join(' | ')}</p>
      </Section>

      <Section title="Projects">
        {projects.map(proj => (
          <div key={proj.id} className="mb-2">
            <p className="font-semibold">{proj.name}</p>
            <p className="text-xs text-gray-700">{proj.description}</p>
          </div>
        ))}
      </Section>
    </div>
  );
};
