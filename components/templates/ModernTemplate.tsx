
import React from 'react';
import { ResumeData } from '../../types';

export const ModernTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects, languages } = resumeData;

  return (
    <div className="bg-white p-8 font-sans text-sm text-gray-800">
      <div className="flex items-center mb-8">
        {/* FIX: Use personalInfo.photo directly as it contains the full data URL */}
        {personalInfo.photo && <img src={personalInfo.photo} alt="Profile" className="w-24 h-24 rounded-full mr-6 object-cover" />}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{personalInfo.name}</h1>
          <h2 className="text-xl font-light text-primary">{personalInfo.title}</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <p className="mb-6 border-b pb-4">{personalInfo.summary}</p>

          <h3 className="text-lg font-bold text-primary border-b-2 border-primary mb-4 pb-1">Experience</h3>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <h4 className="font-bold text-md">{exp.title}</h4>
              <p className="font-semibold text-gray-700">{exp.company} | {exp.startDate} - {exp.endDate}</p>
              <ul className="list-disc list-inside mt-2 text-gray-600 whitespace-pre-wrap">
                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}

          <h3 className="text-lg font-bold text-primary border-b-2 border-primary mt-6 mb-4 pb-1">Projects</h3>
          {projects.map(proj => (
              <div key={proj.id} className="mb-4">
                  <h4 className="font-bold text-md">{proj.name}</h4>
                  <p className="text-gray-600">{proj.description}</p>
              </div>
          ))}
        </div>
        
        <div className="col-span-1">
          <h3 className="text-lg font-bold text-primary border-b-2 border-primary mb-4 pb-1">Contact</h3>
          <ul className="mb-6 text-gray-600">
            <li>{personalInfo.email}</li>
            <li>{personalInfo.phone}</li>
            <li>{personalInfo.location}</li>
            <li>{personalInfo.linkedin}</li>
            <li>{personalInfo.website}</li>
          </ul>

          <h3 className="text-lg font-bold text-primary border-b-2 border-primary mb-4 pb-1">Education</h3>
          {education.map(edu => (
            <div key={edu.id} className="mb-4">
              <h4 className="font-bold text-md">{edu.institution}</h4>
              <p className="text-gray-700">{edu.degree}</p>
              <p className="text-gray-600">{edu.fieldOfStudy}</p>
            </div>
          ))}

          <h3 className="text-lg font-bold text-primary border-b-2 border-primary mt-6 mb-4 pb-1">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{skill.name}</span>
            ))}
          </div>

          <h3 className="text-lg font-bold text-primary border-b-2 border-primary mt-6 mb-4 pb-1">Languages</h3>
          <ul className="text-gray-600">
             {languages.map(lang => <li key={lang.id}>{lang.name}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};