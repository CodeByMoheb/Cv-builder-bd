import React from 'react';
import { ResumeData } from '../../types';
import { BriefcaseIcon, AcademicCapIcon } from '../ui/Icons';

export const TimelineTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills } = resumeData;

  return (
    <div className="bg-white p-8 font-sans text-sm text-gray-800 flex min-h-full">
      <aside className="w-1/3 pr-8">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.name}</h1>
        <h2 className="text-lg font-light text-primary mb-6">{personalInfo.title}</h2>
        
        <p className="text-xs leading-relaxed mb-6">{personalInfo.summary}</p>

        <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Contact</h3>
        <ul className="text-xs space-y-1 mb-6">
          <li>{personalInfo.email}</li>
          <li>{personalInfo.phone}</li>
          <li>{personalInfo.location}</li>
          <li>{personalInfo.linkedin}</li>
        </ul>

        <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Skills</h3>
        <div className="flex flex-wrap gap-1">
            {skills.map(skill => (
                <span key={skill.id} className="bg-gray-200 text-xs px-2 py-0.5 rounded">{skill.name}</span>
            ))}
        </div>
      </aside>

      <main className="w-2/3 pl-8 border-l-2 border-gray-200">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-6">Career Timeline</h3>
          <div className="relative">
            {/* Experience Items */}
            {experience.map((exp, index) => (
              <div key={exp.id} className="pl-8 mb-6 relative">
                <div className="absolute left-[-21px] top-0.5 w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                        <BriefcaseIcon className="w-4 h-4" />
                    </div>
                </div>
                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                <h4 className="font-bold text-md">{exp.title}</h4>
                <p className="text-sm font-semibold text-gray-600 mb-1">{exp.company}</p>
                <div className="text-xs text-gray-600 whitespace-pre-wrap">{exp.description}</div>
              </div>
            ))}
            {/* Education Items */}
            {education.map((edu, index) => (
                 <div key={edu.id} className="pl-8 mb-6 relative">
                    <div className="absolute left-[-21px] top-0.5 w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center">
                             <AcademicCapIcon className="w-4 h-4" />
                        </div>
                    </div>
                    <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                    <h4 className="font-bold text-md">{edu.degree}</h4>
                    <p className="text-sm font-semibold text-gray-600 mb-1">{edu.institution}</p>
                </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
