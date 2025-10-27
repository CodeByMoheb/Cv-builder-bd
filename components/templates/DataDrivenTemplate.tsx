import React from 'react';
import { ResumeData } from '../../types';
import { PresentationChartLineIcon } from '../ui/Icons';

export const DataDrivenTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="flex items-center mb-3">
        <PresentationChartLineIcon className="w-5 h-5 mr-2 text-primary"/>
        <h3 className="text-lg font-bold text-primary tracking-wide uppercase">{title}</h3>
    </div>
  );
  
  return (
    <div className="bg-white p-8 font-sans text-gray-800 text-sm">
        <header className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-gray-900">{personalInfo.name}</h1>
            <h2 className="text-xl font-light text-gray-600">{personalInfo.title}</h2>
            <div className="flex justify-center gap-x-4 mt-2 text-xs text-gray-500 flex-wrap">
                <span>{personalInfo.email}</span>
                <span>&bull;</span>
                <span>{personalInfo.phone}</span>
                <span>&bull;</span>
                <span>{personalInfo.linkedin}</span>
            </div>
        </header>

        <div className="grid grid-cols-3 gap-6 mb-4">
            {experience.slice(0, 3).map((exp, index) => (
                <div key={exp.id} className="bg-gray-100 p-3 rounded-lg text-center">
                    <h4 className="font-bold text-primary text-sm">{exp.title.split(' ')[0]} Highlight</h4>
                    <p className="text-xs text-gray-600">{exp.description.split('\n')[0].replace(/^- /, '')}</p>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-12 gap-8">
            <main className="col-span-8">
                <section className="mb-5">
                    <SectionHeader title="Experience" />
                    {experience.map(exp => (
                        <div key={exp.id} className="mb-4">
                            <h4 className="font-bold text-md">{exp.title} <span className="text-gray-500 font-normal">| {exp.company}</span></h4>
                            <p className="text-xs text-gray-500 mb-1">{exp.startDate} - {exp.endDate}</p>
                            <ul className="list-disc list-inside text-xs text-gray-600 whitespace-pre-wrap">
                                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
                            </ul>
                        </div>
                    ))}
                </section>
                <section>
                    <SectionHeader title="Projects" />
                    {projects.map(proj => (
                        <div key={proj.id} className="mb-4">
                            <h4 className="font-bold text-md">{proj.name}</h4>
                            <p className="text-xs text-gray-600">{proj.description}</p>
                        </div>
                    ))}
                </section>
            </main>
            <aside className="col-span-4">
                <section className="mb-5">
                    <SectionHeader title="About" />
                    <p className="text-xs text-gray-600">{personalInfo.summary}</p>
                </section>
                <section className="mb-5">
                    <SectionHeader title="Skills" />
                    <div className="flex flex-wrap gap-1">
                        {skills.map(skill => (
                            <span key={skill.id} className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded">{skill.name}</span>
                        ))}
                    </div>
                </section>
                <section>
                    <SectionHeader title="Education" />
                    {education.map(edu => (
                        <div key={edu.id} className="mb-3">
                            <h4 className="font-bold text-sm">{edu.institution}</h4>
                            <p className="text-xs text-gray-600">{edu.degree}, {edu.fieldOfStudy}</p>
                        </div>
                    ))}
                </section>
            </aside>
        </div>
    </div>
  );
};
