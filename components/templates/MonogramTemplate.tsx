import React from 'react';
import { ResumeData } from '../../types';

export const MonogramTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;
  const initials = personalInfo.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="bg-white p-8 font-sans text-sm text-gray-800">
        <header className="flex items-center mb-8">
            <div className="relative w-28 h-28 mr-6 flex-shrink-0">
                 {personalInfo.photo ? (
                    <img src={personalInfo.photo} alt="Profile" className="w-28 h-28 rounded-full object-cover" />
                 ) : (
                    <div className="w-28 h-28 rounded-full bg-gray-200"></div>
                 )}
                 <div className="absolute inset-0 rounded-full bg-primary/70 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">{initials}</span>
                 </div>
            </div>
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900">{personalInfo.name}</h1>
                <h2 className="text-xl font-light text-primary">{personalInfo.title}</h2>
            </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
            <main className="col-span-8">
                <p className="mb-6 border-b pb-4 text-xs">{personalInfo.summary}</p>
                <h3 className="text-md font-bold text-primary uppercase tracking-wider mb-4">Experience</h3>
                {experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                    <h4 className="font-bold text-md">{exp.title}</h4>
                    <p className="font-semibold text-gray-700">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                    <ul className="list-disc list-inside mt-1 text-xs text-gray-600 whitespace-pre-wrap">
                        {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                    </ul>
                    </div>
                ))}
            </main>
            <aside className="col-span-4">
                <h3 className="text-md font-bold text-primary uppercase tracking-wider mb-3">Contact</h3>
                <ul className="mb-6 text-xs text-gray-600 space-y-1">
                    <li>{personalInfo.email}</li>
                    <li>{personalInfo.phone}</li>
                    <li>{personalInfo.location}</li>
                    <li>{personalInfo.linkedin}</li>
                </ul>
                <h3 className="text-md font-bold text-primary uppercase tracking-wider mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                    {skills.map(skill => (
                    <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">{skill.name}</span>
                    ))}
                </div>
                <h3 className="text-md font-bold text-primary uppercase tracking-wider mb-3">Education</h3>
                {education.map(edu => (
                    <div key={edu.id} className="mb-3 text-xs">
                    <h4 className="font-bold text-sm">{edu.institution}</h4>
                    <p className="text-gray-700">{edu.degree}</p>
                    <p className="text-gray-600">{edu.fieldOfStudy}</p>
                    </div>
                ))}
            </aside>
        </div>
    </div>
  );
};
