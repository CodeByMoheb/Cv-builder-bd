import React from 'react';
import { ResumeData } from '../../types';

export const GalleryTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-white font-sans text-gray-800 min-h-full">
      <header className="h-48 bg-gray-100 flex items-center justify-center relative">
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl absolute -bottom-16" />
        )}
      </header>
      
      <div className="pt-20 p-8">
        <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900">{personalInfo.name}</h1>
            <p className="text-xl text-primary">{personalInfo.title}</p>
        </div>

        <p className="text-center text-sm max-w-2xl mx-auto mb-8">{personalInfo.summary}</p>
        
        <div className="grid grid-cols-12 gap-8">
            <main className="col-span-8 border-r pr-8">
                 <h2 className="text-lg font-bold uppercase text-gray-700 mb-4">Experience</h2>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <h3 className="text-md font-bold">{exp.title}</h3>
                        <p className="text-sm font-semibold text-gray-600">{exp.company}</p>
                        <p className="text-xs text-gray-400 mb-1">{exp.startDate} - {exp.endDate}</p>
                         <ul className="list-disc list-inside text-xs text-gray-700 whitespace-pre-wrap">
                            {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                        </ul>
                    </div>
                ))}
            </main>
            <aside className="col-span-4 text-sm">
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase text-gray-700 mb-2">Contact</h2>
                     <ul className="text-xs space-y-1">
                        <li>{personalInfo.email}</li>
                        <li>{personalInfo.phone}</li>
                        <li>{personalInfo.location}</li>
                        <li>{personalInfo.linkedin}</li>
                    </ul>
                </section>
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase text-gray-700 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded-md">{skill.name}</span>
                    ))}
                    </div>
                </section>
                <section>
                    <h2 className="text-lg font-bold uppercase text-gray-700 mb-2">Education</h2>
                     {education.map(edu => (
                        <div key={edu.id} className="mb-3">
                            <h3 className="font-semibold text-sm">{edu.institution}</h3>
                            <p className="text-xs text-gray-600">{edu.degree}</p>
                        </div>
                    ))}
                </section>
            </aside>
        </div>
      </div>
    </div>
  );
};
