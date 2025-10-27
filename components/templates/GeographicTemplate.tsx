import React from 'react';
import { ResumeData } from '../../types';
import { MapPinIcon } from '../ui/Icons';

export const GeographicTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-white font-sans min-h-full relative overflow-hidden">
      {/* Decorative background map element */}
      <MapPinIcon className="absolute -right-20 -top-20 w-80 h-80 text-gray-100/50 transform rotate-12" />
      <MapPinIcon className="absolute -left-24 bottom-10 w-60 h-60 text-gray-100/50 transform -rotate-12" />

      <div className="relative z-10 p-8">
        <header className="relative mb-8 text-center">
            <h1 className="text-5xl font-extrabold text-gray-900">{personalInfo.name}</h1>
            <h2 className="text-xl font-light text-primary flex items-center justify-center gap-2">
                <MapPinIcon className="w-5 h-5"/>
                {personalInfo.title} from {personalInfo.location}
            </h2>
        </header>

        <main className="grid grid-cols-12 gap-8 text-sm">
            <div className="col-span-4">
                <section className="mb-6">
                    <h3 className="font-bold text-lg border-b-2 border-primary/50 pb-1 mb-2">About</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{personalInfo.summary}</p>
                </section>
                <section className="mb-6">
                    <h3 className="font-bold text-lg border-b-2 border-primary/50 pb-1 mb-2">Contact</h3>
                    <ul className="text-xs text-gray-700 space-y-1">
                        <li>{personalInfo.email}</li>
                        <li>{personalInfo.phone}</li>
                        <li>{personalInfo.linkedin}</li>
                    </ul>
                </section>
                <section>
                    <h3 className="font-bold text-lg border-b-2 border-primary/50 pb-1 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                        <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{skill.name}</span>
                    ))}
                    </div>
                </section>
            </div>
            <div className="col-span-8">
                <section className="mb-6">
                    <h3 className="font-bold text-lg border-b-2 border-primary/50 pb-1 mb-2">Experience</h3>
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <h4 className="font-semibold text-md">{exp.title}</h4>
                            <p className="font-medium text-gray-600 text-sm">{exp.company}</p>
                            <p className="text-xs text-gray-400 mb-1">{exp.startDate} - {exp.endDate}</p>
                            <ul className="list-disc list-inside text-xs text-gray-700 whitespace-pre-wrap">
                                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>
                 <div className="grid grid-cols-2 gap-6">
                    <section>
                        <h3 className="font-bold text-lg border-b-2 border-primary/50 pb-1 mb-2">Education</h3>
                        {education.map(edu => (
                        <div key={edu.id} className="mb-3">
                            <h4 className="font-semibold text-md">{edu.institution}</h4>
                            <p className="text-sm text-gray-600">{edu.degree}</p>
                        </div>
                        ))}
                    </section>
                    <section>
                        <h3 className="font-bold text-lg border-b-2 border-primary/50 pb-1 mb-2">Projects</h3>
                        {projects.map(proj => (
                        <div key={proj.id} className="mb-3">
                            <h4 className="font-semibold text-md">{proj.name}</h4>
                            <p className="text-xs text-gray-600">{proj.description}</p>
                        </div>
                        ))}
                    </section>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
};
