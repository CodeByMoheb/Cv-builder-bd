import React from 'react';
import { ResumeData } from '../../types';

export const GridTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  const Card: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => (
    <div className={`bg-gray-50/80 p-4 rounded-lg ${className}`}>
      <h3 className="text-md font-bold text-primary mb-2 border-b border-gray-200 pb-1">{title}</h3>
      <div className="text-xs text-gray-700">{children}</div>
    </div>
  );

  return (
    <div className="bg-white p-8 font-sans">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
        <p className="text-lg text-gray-600">{personalInfo.title}</p>
      </header>

      <div className="grid grid-cols-4 grid-rows-4 gap-4">
        <Card title="Summary" className="col-span-4 row-span-1">
            <p className="leading-relaxed">{personalInfo.summary}</p>
        </Card>
        
        <Card title="Experience" className="col-span-2 row-span-3">
          <div className="space-y-3">
            {experience.map(exp => (
              <div key={exp.id}>
                <p className="font-semibold">{exp.title}</p>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-gray-400 text-[10px]">{exp.startDate} - {exp.endDate}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Contact" className="col-span-2 row-span-1">
          <ul className="space-y-1">
            <li>Email: {personalInfo.email}</li>
            <li>Phone: {personalInfo.phone}</li>
            <li>Web: {personalInfo.linkedin}</li>
          </ul>
        </Card>

        <Card title="Skills" className="col-span-1 row-span-2">
          <ul className="space-y-1">
            {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
          </ul>
        </Card>

        <Card title="Education" className="col-span-1 row-span-2">
          <div className="space-y-2">
            {education.map(edu => (
                <div key={edu.id}>
                    <p className="font-semibold">{edu.institution}</p>
                    <p className="text-gray-600">{edu.degree}</p>
                </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
