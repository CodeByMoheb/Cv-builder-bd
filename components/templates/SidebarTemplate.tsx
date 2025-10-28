import React from 'react';
import { ResumeData } from '../../types';

export const SidebarTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-white flex font-sans text-gray-800 min-h-full">
      <aside className="w-1/3 bg-[#2c3e50] text-white p-6 flex flex-col items-center text-center">
        {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white/50" />
        )}
        <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
        <p className="text-md font-light text-gray-300 mb-6">{personalInfo.title}</p>
        
        <div className="w-full space-y-5 text-left text-xs">
            <div>
                <h3 className="font-semibold uppercase tracking-wider border-b border-white/30 pb-1 mb-2">Contact</h3>
                <ul className="space-y-1 opacity-90">
                    <li>{personalInfo.email}</li>
                    <li>{personalInfo.phone}</li>
                    <li>{personalInfo.location}</li>
                    <li>{personalInfo.linkedin}</li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold uppercase tracking-wider border-b border-white/30 pb-1 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-1">
                    {skills.map(skill => <span key={skill.id} className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full">{skill.name}</span>)}
                </div>
            </div>
            <div>
                <h3 className="font-semibold uppercase tracking-wider border-b border-white/30 pb-1 mb-2">Education</h3>
                {education.map(edu => (
                    <div key={edu.id} className="mb-2">
                        <h4 className="font-bold">{edu.degree}</h4>
                        <p className="opacity-90">{edu.institution}</p>
                    </div>
                ))}
            </div>
        </div>
      </aside>

      <main className="w-2/3 p-8">
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase text-[#2c3e50] mb-3">Profile</h2>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
        
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase text-[#2c3e50] mb-3">Work Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-md font-bold">{exp.title}</h3>
                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">{exp.company}</p>
              <ul className="list-disc list-inside text-xs text-gray-600 whitespace-pre-wrap">
                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </section>
         <section>
          <h2 className="text-lg font-bold uppercase text-[#2c3e50] mb-3">Projects</h2>
          {projects.map(proj => (
            <div key={proj.id} className="mb-3">
              <h3 className="text-md font-bold">{proj.name}</h3>
              <p className="text-xs text-gray-600">{proj.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};
