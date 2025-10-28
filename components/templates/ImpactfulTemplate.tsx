import React from 'react';
import { ResumeData } from '../../types';

export const ImpactfulTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-white p-8 font-sans text-sm text-gray-800 min-h-full relative">
      <div className="absolute top-0 right-0 h-48 w-48 bg-primary/10"></div>
      <div className="absolute bottom-0 left-0 h-32 w-32 bg-gray-100"></div>
      
      <div className="relative z-10">
        <header className="grid grid-cols-12 gap-8 mb-8 items-center">
            <div className="col-span-8">
                <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">{personalInfo.name}</h1>
                <h2 className="text-2xl font-light text-primary">{personalInfo.title}</h2>
            </div>
            <div className="col-span-4 flex justify-end">
                {personalInfo.photo && (
                    <img src={personalInfo.photo} alt="Profile" className="w-32 h-32 object-cover border-4 border-white shadow-lg" />
                )}
            </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
            <aside className="col-span-4">
                <section className="mb-6">
                    <h3 className="font-bold border-b-2 border-primary pb-1 mb-2">Contact</h3>
                    <ul className="text-xs space-y-1">
                        <li>{personalInfo.email}</li>
                        <li>{personalInfo.phone}</li>
                        <li>{personalInfo.location}</li>
                        <li>{personalInfo.linkedin}</li>
                    </ul>
                </section>
                <section className="mb-6">
                    <h3 className="font-bold border-b-2 border-primary pb-1 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-1">
                        {skills.map(skill => <span key={skill.id} className="bg-primary text-white text-[10px] px-2 py-1 rounded">{skill.name}</span>)}
                    </div>
                </section>
                <section>
                    <h3 className="font-bold border-b-2 border-primary pb-1 mb-2">Education</h3>
                    {education.map(edu => (
                    <div key={edu.id} className="mb-2 text-xs">
                        <h4 className="font-semibold">{edu.institution}</h4>
                        <p>{edu.degree}</p>
                    </div>
                    ))}
                </section>
            </aside>

            <main className="col-span-8">
                <section className="mb-6">
                    <h3 className="font-bold text-lg mb-2">Summary</h3>
                    <p className="text-xs leading-relaxed">{personalInfo.summary}</p>
                </section>
                <section>
                    <h3 className="font-bold text-lg mb-2">Experience</h3>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <h4 className="font-semibold text-md">{exp.title}</h4>
                            <p className="text-sm text-gray-600">{exp.company}</p>
                            <ul className="list-disc list-inside mt-1 text-xs text-gray-700 whitespace-pre-wrap">
                                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>
            </main>
        </div>
      </div>
    </div>
  );
};
