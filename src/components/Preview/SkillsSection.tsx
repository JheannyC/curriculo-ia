import React from 'react'
import { Skill } from '../../types/cv.types'

interface SkillsSectionProps {
  skills: Skill[]
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  if (skills.length === 0) return null

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Habilidades</h2>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {skills.map(skill => (
          <div key={skill.id} className="flex justify-between items-center">
            <span className="text-gray-700">{skill.name}</span>
            <span className="text-sm text-gray-500">{skill.level}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsSection