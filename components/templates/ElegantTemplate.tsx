import React from 'react';
import { ResumeData } from '../../types';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, LinkIcon } from '../ui/Icons';

export const ElegantTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills } = resumeData;

  return (
    <div className="bg-white flex font-serif min-h-full">
      <div className="w-1/3 bg-gray-50 p-6">
        {personalInfo.photo && (
          <img src={personalInfo.photo} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg" />
        )}
        <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">{personalInfo.name}</h1>
            <p className="text-md text-gray-600">{personalInfo.title}</p>
        </div>
        
        <div className="space-y-4 text-xs text-gray-700">
            <div>
                <h3 className="font-bold uppercase tracking-wider mb-2 text-primary">Contact</h3>
                <ul className="space-y-1">
                    <li className="flex items-center"><EnvelopeIcon className="w-3 h-3 mr-2 text-primary"/>{personalInfo.email}</li>
                    <li className="flex items-center"><PhoneIcon className="w-3 h-3 mr-2 text-primary"/>{personalInfo.phone}</li>
                    <li className="flex items-center"><MapPinIcon className="w-3 h-3 mr-2 text-primary"/>{personalInfo.location}</li>
                    <li className="flex items-center"><LinkIcon className="w-3 h-3 mr-2 text-primary"/>{personalInfo.linkedin}</li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold uppercase tracking-wider mb-2 text-primary">Skills</h3>
                <ul className="list-disc list-inside">
                    {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
                </ul>
            </div>
            <div>
                <h3 className="font-bold uppercase tracking-wider mb-2 text-primary">Education</h3>
                {education.map(edu => (
                  <div key={edu.id} className="mb-2">
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p>{edu.institution}</p>
                    <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
            </div>
        </div>
      </div>

      <div className="w-2/3 p-8">
        <section className="mb-8">
          <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-4">Summary</h2>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-4">Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate}</p>
              </div>
              <p className="text-md font-medium text-gray-700 mb-1">{exp.company}</p>
              <ul className="list-disc list-inside text-sm text-gray-700 whitespace-pre-wrap">
                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
