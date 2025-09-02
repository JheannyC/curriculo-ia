import React from 'react'
import type { Experience } from '../../types/cv.types'

interface ExperienceSectionProps {
  experiences: Experience[]
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  if (experiences.length === 0) return null

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Experiência Profissional</h2>
      <div className="mt-4 space-y-4">
        {experiences.map(exp => (
          <div key={exp.id} className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-800">{exp.position}</h3>
            <p className="text-gray-600">{exp.company}</p>
            <p className="text-sm text-gray-500">
              {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
            </p>
            <p className="mt-2 text-gray-700 text-sm whitespace-pre-line">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExperienceSection