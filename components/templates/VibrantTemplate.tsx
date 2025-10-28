import React from 'react';
import { ResumeData } from '../../types';

export const VibrantTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-white font-sans text-gray-800 min-h-full">
      <header className="bg-primary text-white p-8 relative">
        <div className="flex items-center">
            {personalInfo.photo && (
              <img src={personalInfo.photo} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-white mr-6" />
            )}
            <div>
              <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
              <h2 className="text-xl font-light">{personalInfo.title}</h2>
            </div>
        </div>
      </header>
      
      <main className="p-8">
        <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
                <section className="mb-6">
                    <h3 className="font-bold text-lg text-primary mb-2">About Me</h3>
                    <p className="text-xs leading-relaxed">{personalInfo.summary}</p>
                </section>
                 <section className="mb-6">
                    <h3 className="font-bold text-lg text-primary mb-2">Contact</h3>
                    <ul className="text-xs space-y-1">
                        <li>{personalInfo.email}</li>
                        <li>{personalInfo.phone}</li>
                        <li>{personalInfo.location}</li>
                        <li>{personalInfo.linkedin}</li>
                    </ul>
                </section>
                <section>
                    <h3 className="font-bold text-lg text-primary mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded-md">{skill.name}</span>
                    ))}
                    </div>
                </section>
            </div>
            <div className="col-span-8">
                <section className="mb-6">
                    <h3 className="font-bold text-lg text-primary mb-3">Experience</h3>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4 border-l-4 border-primary/30 pl-4">
                            <h4 className="font-bold text-md">{exp.title}</h4>
                            <p className="text-sm font-semibold text-gray-600">{exp.company}</p>
                            <p className="text-xs text-gray-400 mb-1">{exp.startDate} - {exp.endDate}</p>
                            <ul className="list-disc list-inside text-xs text-gray-700 whitespace-pre-wrap">
                                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>
                 <section>
                    <h3 className="font-bold text-lg text-primary mb-3">Education</h3>
                    {education.map(edu => (
                        <div key={edu.id} className="mb-3">
                            <h4 className="font-semibold text-md">{edu.institution}</h4>
                            <p className="text-sm text-gray-600">{edu.degree}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
      </main>
    </div>
  );
};
