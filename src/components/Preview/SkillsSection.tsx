import React from 'react'
import type { Skill } from '../../types/cv.types'

interface SkillsSectionProps {
  skills: Skill[]
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  const getLevelColor = (level: Skill['level']) => {
    switch (level) {
      case 'Avançado': return 'bg-green-100 text-green-800'
      case 'Intermediário': return 'bg-blue-100 text-blue-800'
      case 'Básico': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (skills.length === 0) return null

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">Habilidades</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map(skill => (
          <div
            key={skill.id}
            className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(skill.level)}`}
          >
            {skill.name} <span className="text-xs">({skill.level})</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsSection