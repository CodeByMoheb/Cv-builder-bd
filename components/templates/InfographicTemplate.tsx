
import React from 'react';
import { ResumeData } from '../../types';

// Dummy icons for infographic style
const SectionIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-4 flex-shrink-0">
        {children}
    </div>
);

export const InfographicTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-white flex min-h-full font-sans">
      <aside className="w-1/3 bg-gray-100 p-6 flex flex-col items-center">
        {personalInfo.photo && (
            <img src={personalInfo.photo} alt="Profile" className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-white shadow-lg" />
        )}
        <h1 className="text-2xl font-bold text-gray-800 text-center">{personalInfo.name}</h1>
        <h2 className="text-md font-light text-primary text-center mb-6">{personalInfo.title}</h2>

        <div className="w-full">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 text-center border-b pb-2">Contact</h3>
            <ul className="text-xs text-gray-600 space-y-2 mb-6">
                <li><span className="font-semibold">E:</span> {personalInfo.email}</li>
                <li><span className="font-semibold">P:</span> {personalInfo.phone}</li>
                <li><span className="font-semibold">L:</span> {personalInfo.location}</li>
                <li><span className="font-semibold">W:</span> {personalInfo.linkedin}</li>
            </ul>

            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 text-center border-b pb-2">Skills</h3>
            <div className="space-y-2 mb-6">
                {skills.map(skill => (
                    <div key={skill.id} className="text-xs">
                        <p className="font-medium text-gray-700">{skill.name}</p>
                        <div className="w-full bg-gray-300 rounded-full h-1.5 mt-1">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${Math.floor(Math.random() * 41) + 60}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>

             <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3 text-center border-b pb-2">Education</h3>
            {education.map(edu => (
                <div key={edu.id} className="mb-4 text-xs">
                <h4 className="font-bold text-sm">{edu.institution}</h4>
                <p className="text-gray-700">{edu.degree}</p>
                <p className="text-gray-600">{edu.fieldOfStudy}</p>
                </div>
            ))}
        </div>
      </aside>

      <main className="w-2/3 p-8">
        <section className="mb-6">
             <div className="flex items-center mb-3">
                <SectionIcon>&#9733;</SectionIcon>
                <h3 className="text-xl font-bold text-gray-700">Summary</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 pl-12">{personalInfo.summary}</p>
        </section>

        <section className="mb-6">
            <div className="flex items-center mb-4">
                <SectionIcon>&#128188;</SectionIcon>
                <h3 className="text-xl font-bold text-gray-700">Experience</h3>
            </div>
            <div className="pl-6 border-l-2 border-primary/50">
            {experience.map(exp => (
              <div key={exp.id} className="mb-5 relative">
                  <div className="absolute -left-[30px] top-1 w-4 h-4 bg-white border-2 border-primary rounded-full"></div>
                  <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  <h4 className="font-bold text-md">{exp.title}</h4>
                  <p className="text-sm font-semibold text-gray-600 mb-1">{exp.company}</p>
                  <div className="text-xs text-gray-600 whitespace-pre-wrap">{exp.description}</div>
              </div>
            ))}
            </div>
        </section>

        <section>
            <div className="flex items-center mb-4">
                <SectionIcon>&#128220;</SectionIcon>
                <h3 className="text-xl font-bold text-gray-700">Projects</h3>
            </div>
             <div className="pl-12">
            {projects.map(proj => (
                <div key={proj.id} className="mb-4">
                    <h4 className="font-bold text-md">{proj.name}</h4>
                    <p className="text-xs text-gray-600">{proj.description}</p>
                </div>
            ))}
            </div>
        </section>
      </main>
    </div>
  );
};
