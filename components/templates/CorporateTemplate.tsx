import React from 'react';
import { ResumeData } from '../../types';

export const CorporateTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-white flex font-sans min-h-full">
      <div className="w-1/3 bg-primary text-white p-8 flex flex-col justify-between">
        <div>
            {personalInfo.photo && (
                <img src={personalInfo.photo} alt="Profile" className="w-28 h-28 rounded-full mb-4 object-cover border-4 border-white/50" />
            )}
            <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
            <h2 className="text-lg font-light">{personalInfo.title}</h2>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider border-b border-white/30 pb-1 mb-3">Contact</h3>
          <ul className="text-xs space-y-1 mb-6">
            <li>{personalInfo.email}</li>
            <li>{personalInfo.phone}</li>
            <li>{personalInfo.location}</li>
            <li>{personalInfo.linkedin}</li>
          </ul>

          <h3 className="text-sm font-semibold uppercase tracking-wider border-b border-white/30 pb-1 mb-3">Skills</h3>
          <ul className="text-xs list-disc list-inside space-y-1">
            {skills.map(skill => <li key={skill.id}>{skill.name}</li>)}
          </ul>
        </div>
        <div></div>
      </div>

      <div className="w-2/3 p-8 text-sm">
        <section className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-2">Summary</h3>
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>

        <section className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-3">Experience</h3>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-md text-gray-800">{exp.title}</h4>
                <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">{exp.company}</p>
              <ul className="list-disc list-inside text-xs text-gray-600 whitespace-pre-wrap">
                {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
              </ul>
            </div>
          ))}
        </section>
        
        <div className="grid grid-cols-2 gap-6">
            <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-3">Education</h3>
              {education.map(edu => (
                <div key={edu.id} className="mb-3">
                  <h4 className="font-bold text-md text-gray-800">{edu.institution}</h4>
                  <p className="text-sm text-gray-600">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.fieldOfStudy}</p>
                </div>
              ))}
            </section>
             <section>
              <h3 className="text-lg font-bold uppercase tracking-wider text-primary mb-3">Projects</h3>
              {projects.map(proj => (
                <div key={proj.id} className="mb-3">
                  <h4 className="font-bold text-md text-gray-800">{proj.name}</h4>
                  <p className="text-xs text-gray-600">{proj.description}</p>
                </div>
              ))}
            </section>
        </div>

      </div>
    </div>
  );
};