import React from 'react';
import { ResumeData } from '../../types';

export const SwissTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { personalInfo, experience, education, skills, projects } = resumeData;

  return (
    <div className="bg-white p-8 font-sans text-gray-800 text-xs leading-relaxed">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 mb-6">
          <h1 className="text-3xl font-bold tracking-tighter">{personalInfo.name}</h1>
          <h2 className="text-lg font-light text-primary">{personalInfo.title}</h2>
        </div>

        <div className="col-span-3">
          <h3 className="font-bold mb-2">Contact</h3>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.email}</p>
          <p>{personalInfo.linkedin}</p>
          <p>{personalInfo.location}</p>
        </div>

        <div className="col-span-9 mb-6">
          <p>{personalInfo.summary}</p>
        </div>

        <div className="col-span-3">
          <h3 className="font-bold mb-2">Skills</h3>
          {skills.map(skill => (
            <p key={skill.id}>{skill.name}</p>
          ))}
        </div>

        <div className="col-span-9 mb-6">
          <h3 className="font-bold mb-2 border-b">Experience</h3>
          {experience.map(exp => (
            <div key={exp.id} className="grid grid-cols-12 mb-3">
              <div className="col-span-3 text-gray-600">
                <p>{exp.startDate} -</p>
                <p>{exp.endDate}</p>
              </div>
              <div className="col-span-9">
                <p className="font-semibold">{exp.company}</p>
                <p className="italic">{exp.title}</p>
                <p className="mt-1 whitespace-pre-wrap">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-3">
          <h3 className="font-bold mb-2">Education</h3>
          {education.map(edu => (
            <div key={edu.id} className="mb-2">
              <p>{edu.startDate} - {edu.endDate}</p>
              <p className="font-semibold">{edu.institution}</p>
              <p>{edu.degree}</p>
            </div>
          ))}
        </div>

        <div className="col-span-9">
          <h3 className="font-bold mb-2 border-b">Projects</h3>
          {projects.map(proj => (
            <div key={proj.id} className="mb-3">
              <p className="font-semibold">{proj.name}</p>
              <p>{proj.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};