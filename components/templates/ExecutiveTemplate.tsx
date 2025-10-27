
import React from 'react';
import { ResumeData } from '../../types';

export const ExecutiveTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills } = resumeData;

  return (
    <div className="bg-white flex font-serif text-gray-800 min-h-full">
      <div className="w-1/3 bg-gray-800 text-white p-8">
        {personalInfo.photo && (
            <img src={`data:image/jpeg;base64,${personalInfo.photo}`} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-gray-500" />
        )}
        <h3 className="text-xl font-semibold border-b border-gray-500 pb-2 mb-4">Contact</h3>
        <ul className="text-sm space-y-2 mb-6">
          <li>{personalInfo.email}</li>
          <li>{personalInfo.phone}</li>
          <li>{personalInfo.location}</li>
          <li>{personalInfo.linkedin}</li>
        </ul>
        
        <h3 className="text-xl font-semibold border-b border-gray-500 pb-2 mb-4">Education</h3>
        {education.map(edu => (
          <div key={edu.id} className="mb-4 text-sm">
            <h4 className="font-bold">{edu.degree}</h4>
            <p className="">{edu.institution}</p>
            <p className="text-gray-300">{edu.startDate} - {edu.endDate}</p>
          </div>
        ))}

        <h3 className="text-xl font-semibold border-b border-gray-500 pb-2 my-4">Skills</h3>
        <ul className="text-sm space-y-1">
          {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
        </ul>
      </div>

      <div className="w-2/3 p-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900">{personalInfo.name}</h1>
          <h2 className="text-2xl text-gray-600">{personalInfo.title}</h2>
        </div>

        <p className="text-justify mb-8 text-sm">{personalInfo.summary}</p>
        
        <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Experience</h3>
        {experience.map(exp => (
          <div key={exp.id} className="mb-6">
            <div className="flex justify-between items-baseline">
              <h4 className="text-lg font-bold">{exp.title}</h4>
              <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
            </div>
            <p className="text-md font-semibold text-gray-700 mb-1">{exp.company}</p>
            <div className="text-sm text-gray-600 whitespace-pre-wrap pl-4 border-l-2 border-gray-200">
              {exp.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
