
import React from 'react';
import { ResumeData } from '../../types';

const Section: React.FC<{ title: string; children: React.ReactNode, color: string }> = ({ title, children, color }) => (
  <section className="mb-6">
    <h2 className="text-xl font-bold border-b-2 pb-2 mb-3" style={{ borderColor: '#D1D5DB' }}>{title}</h2>
    {children}
  </section>
);

export const ClassicTemplate: React.FC<{ resumeData: ResumeData }> = ({ resumeData }) => {
  const { customization, ...data } = resumeData;
  const { colors, font } = customization;

  const sectionsMap: Record<string, React.ReactNode> = {
    summary: (
      <Section key="summary" title="Summary" color={colors.primary}>
        <p className="text-sm leading-relaxed">{data.personalInfo.summary}</p>
      </Section>
    ),
    experience: (
      <Section key="experience" title="Experience" color={colors.primary}>
        {data.experience.map(exp => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold">{exp.title}</h3>
              <span className="text-sm font-light text-gray-600">{exp.startDate} - {exp.endDate}</span>
            </div>
            <p className="text-md font-medium text-gray-700">{exp.company} | {exp.location}</p>
            <ul className="mt-1 list-disc list-inside text-sm text-gray-700 whitespace-pre-wrap">
              {exp.description.split('\n').map((line, i) => line.trim() && <li key={i}>{line.replace(/^- /, '')}</li>)}
            </ul>
          </div>
        ))}
      </Section>
    ),
    education: (
      <Section key="education" title="Education" color={colors.primary}>
        {data.education.map(edu => (
          <div key={edu.id} className="mb-3">
             <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold">{edu.institution}</h3>
                <span className="text-sm font-light text-gray-600">{edu.startDate} - {edu.endDate}</span>
            </div>
            <p className="text-md text-gray-700">{edu.degree}, {edu.fieldOfStudy}</p>
          </div>
        ))}
      </Section>
    ),
    skills: (
      <Section key="skills" title="Skills" color={colors.primary}>
        <p className="text-sm leading-relaxed">{data.skills.map(skill => skill.name).join(' • ')}</p>
      </Section>
    ),
    projects: data.projects.length > 0 && (
      <Section key="projects" title="Projects" color={colors.primary}>
        {data.projects.map(proj => (
          <div key={proj.id} className="mb-3">
            <h3 className="text-lg font-semibold">{proj.name}</h3>
            <p className="text-sm text-gray-700">{proj.description}</p>
          </div>
        ))}
      </Section>
    ),
    languages: data.languages.length > 0 && (
      <Section key="languages" title="Languages" color={colors.primary}>
        <p className="text-sm leading-relaxed">{data.languages.map(lang => lang.name).join(', ')}</p>
      </Section>
    ),
  };

  return (
    <div className="p-10 font-serif" style={{ backgroundColor: colors.background, color: colors.text, fontFamily: font }}>
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-widest">{data.personalInfo.name}</h1>
        <p className="text-lg mt-1" style={{color: colors.primary}}>{data.personalInfo.title}</p>
        <div className="flex justify-center gap-x-4 mt-4 text-sm text-gray-600 flex-wrap">
          <span>{data.personalInfo.email}</span>
          <span>|</span>
          <span>{data.personalInfo.phone}</span>
          <span>|</span>
          <span>{data.personalInfo.location}</span>
          {data.personalInfo.linkedin && (
            <>
              <span>|</span>
              <span>{data.personalInfo.linkedin}</span>
            </>
          )}
        </div>
      </header>
      
      {customization.sectionOrder.map(key => sectionsMap[key])}

    </div>
  );
};