import React from 'react';
import { ResumeData } from '../../types';

export const TwoToneTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="flex font-sans min-h-full">
      <div className="w-1/3 bg-primary text-white p-8 flex flex-col">
        <h1 className="text-4xl font-bold leading-tight">{personalInfo.name}</h1>
        <h2 className="text-lg font-light mb-8">{personalInfo.title}</h2>
        
        <p className="text-xs leading-relaxed border-t border-white/30 pt-4 mb-auto">{personalInfo.summary}</p>
        
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Contact</h3>
          <ul className="text-xs space-y-1">
            <li>{personalInfo.email}</li>
            <li>{personalInfo.phone}</li>
            <li>{personalInfo.linkedin}</li>
          </ul>
        </div>
      </div>

      <div className="w-2/3 bg-white p-8 text-sm">
        <section className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Experience</h3>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-md">{exp.title}</h4>
                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">{exp.company}</p>
              <ul className="list-disc list-inside text-xs text-gray-600 whitespace-pre-wrap">
                 {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-2 gap-6">
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Education</h3>
            {education.map(edu => (
              <div key={edu.id} className="mb-3">
                <h4 className="font-bold text-md">{edu.institution}</h4>
                <p className="text-sm text-gray-600">{edu.degree}</p>
              </div>
            ))}
          </section>
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                    <span key={skill.id} className="bg-gray-200 text-xs px-2 py-1 rounded">{skill.name}</span>
                ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
