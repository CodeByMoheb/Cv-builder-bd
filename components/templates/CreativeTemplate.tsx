
import React from 'react';
import { ResumeData } from '../../types';
import { UserCircleIcon } from '../ui/Icons';

export const CreativeTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-white p-8 font-sans text-sm text-gray-800 flex flex-col min-h-full">
      <header className="flex justify-between items-center border-b-4 border-primary pb-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-wide">{personalInfo.name}</h1>
          <h2 className="text-xl font-light text-primary">{personalInfo.title}</h2>
        </div>
        <div className="text-right text-xs">
            <div>{personalInfo.email}</div>
            <div>{personalInfo.phone}</div>
            <div>{personalInfo.location}</div>
        </div>
      </header>
      
      <div className="flex-grow grid grid-cols-12 gap-8">
        <aside className="col-span-4 pr-6 border-r">
          {personalInfo.photo ? 
            // FIX: Use personalInfo.photo directly as it contains the full data URL
            <img src={personalInfo.photo} alt="Profile" className="w-32 h-32 rounded-full mb-6 mx-auto object-cover border-2 border-primary p-1" />
            :
            <UserCircleIcon className="w-32 h-32 text-gray-300 mb-6 mx-auto" />
          }
           
           <h3 className="text-md font-bold text-primary uppercase tracking-wider mb-3">About Me</h3>
           <p className="text-xs mb-6">{personalInfo.summary}</p>

           <h3 className="text-md font-bold text-primary uppercase tracking-wider mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-6">
                {skills.map(skill => (
                <span key={skill.id} className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded">{skill.name}</span>
                ))}
            </div>

           <h3 className="text-md font-bold text-primary uppercase tracking-wider mb-3">Education</h3>
          {education.map(edu => (
            <div key={edu.id} className="mb-4 text-xs">
              <h4 className="font-bold text-sm">{edu.institution}</h4>
              <p className="text-gray-700">{edu.degree}</p>
              <p className="text-gray-600">{edu.fieldOfStudy}</p>
            </div>
          ))}
        </aside>

        <main className="col-span-8">
           <h3 className="text-md font-bold text-primary uppercase tracking-wider mb-4">Experience</h3>
          {experience.map(exp => (
            <div key={exp.id} className="mb-5 relative pl-5">
                <div className="absolute left-0 top-1.5 w-2 h-2 bg-primary rounded-full"></div>
                <h4 className="font-bold text-md">{exp.title} <span className="text-gray-500 font-normal">at {exp.company}</span></h4>
                <p className="text-xs text-gray-500 mb-1">{exp.startDate} - {exp.endDate}</p>
                <div className="text-xs text-gray-600 whitespace-pre-wrap">
                    {exp.description}
                </div>
            </div>
          ))}

           <h3 className="text-md font-bold text-primary uppercase tracking-wider mt-6 mb-4">Projects</h3>
            {projects.map(proj => (
                <div key={proj.id} className="mb-4">
                    <h4 className="font-bold text-md">{proj.name}</h4>
                    <p className="text-xs text-gray-600">{proj.description}</p>
                </div>
            ))}
        </main>
      </div>
    </div>
  );
};