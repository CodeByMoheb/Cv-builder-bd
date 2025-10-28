import React from 'react';
import { ResumeData } from '../../types';

export const ProfessionalTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-white p-8 font-sans text-sm text-gray-800">
      <header className="flex items-center justify-between mb-6 pb-4 border-b-4 border-primary">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">{personalInfo.name}</h1>
          <h2 className="text-xl font-light text-gray-600">{personalInfo.title}</h2>
          <div className="flex gap-x-4 mt-2 text-xs text-gray-500">
            <span>{personalInfo.email}</span>
            <span>{personalInfo.phone}</span>
            <span>{personalInfo.linkedin}</span>
          </div>
        </div>
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Profile" className="w-28 h-28 rounded-md object-cover" />
        )}
      </header>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Summary</h3>
            <p className="leading-relaxed">{personalInfo.summary}</p>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Experience</h3>
            {experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-bold text-md">{exp.title}</h4>
                  <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                </div>
                <p className="font-semibold text-gray-700 text-sm">{exp.company}</p>
                <ul className="list-disc list-inside mt-1 text-xs text-gray-600 whitespace-pre-wrap">
                  {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                </ul>
              </div>
            ))}
          </section>
        </div>
        
        <aside className="col-span-1">
          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Skills</h3>
            <ul className="space-y-1 text-sm">
              {skills.map(skill => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Education</h3>
            {education.map(edu => (
              <div key={edu.id} className="mb-3">
                <h4 className="font-bold text-md">{edu.degree}</h4>
                <p className="text-sm text-gray-700">{edu.institution}</p>
                <p className="text-xs text-gray-600">{edu.fieldOfStudy}</p>
              </div>
            ))}
          </section>
          
           <section>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-3">Projects</h3>
            {projects.map(proj => (
              <div key={proj.id} className="mb-3">
                <h4 className="font-bold text-md">{proj.name}</h4>
                <p className="text-xs text-gray-600">{proj.description}</p>
              </div>
            ))}
          </section>
        </aside>
      </div>
    </div>
  );
};
