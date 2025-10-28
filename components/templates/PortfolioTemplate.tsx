import React from 'react';
import { ResumeData } from '../../types';
import { LinkIcon } from '../ui/Icons';

export const PortfolioTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-gray-50 flex font-sans min-h-full">
      <div className="w-2/5 bg-white p-8 shadow-lg z-10">
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Profile" className="w-36 h-36 rounded-full mx-auto mb-4 object-cover border-4 border-primary" />
        )}
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{personalInfo.name}</h1>
            <p className="text-lg text-gray-600">{personalInfo.title}</p>
        </div>
        
        <p className="text-center text-xs text-gray-600 mb-6 border-y py-4">{personalInfo.summary}</p>

        <div className="text-xs space-y-4">
            <div>
                <h3 className="font-semibold uppercase tracking-wider mb-2">Contact</h3>
                <ul className="space-y-1 text-gray-700">
                    <li>{personalInfo.email}</li>
                    <li>{personalInfo.phone}</li>
                    <li>{personalInfo.location}</li>
                </ul>
            </div>
             <div>
                <h3 className="font-semibold uppercase tracking-wider mb-2">Online</h3>
                <ul className="space-y-1 text-gray-700">
                    <li className="flex items-center gap-1"><LinkIcon className="w-3 h-3"/>{personalInfo.linkedin}</li>
                    <li className="flex items-center gap-1"><LinkIcon className="w-3 h-3"/>{personalInfo.website}</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold uppercase tracking-wider mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                    <span key={skill.id} className="bg-primary text-white text-[10px] font-medium px-2 py-1 rounded">{skill.name}</span>
                ))}
                </div>
            </div>
        </div>
      </div>

      <div className="w-3/5 p-8 text-sm">
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Work Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <h3 className="text-md font-bold">{exp.title}</h3>
              <p className="text-sm font-semibold text-gray-600 mb-1">{exp.company}</p>
              <ul className="list-disc list-inside text-xs text-gray-600 whitespace-pre-wrap">
                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </section>
        <div className="grid grid-cols-2 gap-6">
            <section className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Projects</h2>
            {projects.map(proj => (
                <div key={proj.id} className="mb-3">
                <h3 className="text-md font-bold">{proj.name}</h3>
                <p className="text-xs text-gray-600">{proj.description}</p>
                </div>
            ))}
            </section>
            <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
            {education.map(edu => (
                <div key={edu.id} className="mb-3">
                <h3 className="text-md font-bold">{edu.institution}</h3>
                <p className="text-sm text-gray-600">{edu.degree}</p>
                </div>
            ))}
            </section>
        </div>
      </div>
    </div>
  );
};
