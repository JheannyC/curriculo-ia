import React, { useState, ChangeEvent } from 'react'
import { Skill, SkillLevel } from '../../types/cv.types' // Corrigir importação

interface SkillsProps {
  skills: Skill[]
  onAddSkill: (skill: Omit<Skill, 'id'>) => void
  onRemoveSkill: (id: string) => void
}

const Skills: React.FC<SkillsProps> = ({ skills, onAddSkill, onRemoveSkill }) => {
  const [newSkill, setNewSkill] = useState<{ name: string; level: SkillLevel }>({ // Corrigir para SkillLevel
    name: '', 
    level: 'Básico' 
  })

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      onAddSkill(newSkill)
      setNewSkill({ name: '', level: 'Básico' })
    }
  }

  const handleInputChange = (field: keyof typeof newSkill) => (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewSkill(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Habilidades</h2>
      
      <div className="space-y-4">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label htmlFor="skillName" className="block text-sm font-medium text-gray-700 mb-1">
              Nome da habilidade
            </label>
            <input
              id="skillName"
              type="text"
              value={newSkill.name}
              onChange={handleInputChange('name')}
              placeholder="Ex: JavaScript, React, Python"
              className="w-full p-2 border border-gray-300 rounded-md"
              aria-label="Nome da habilidade"
            />
          </div>
          
          <div>
            <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Nível
            </label>
            <select
              id="skillLevel"
              value={newSkill.level}
              onChange={handleInputChange('level')}
              className="p-2 border border-gray-300 rounded-md"
              aria-label="Nível de proficiência"
            >
              <option value="Básico">Básico</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>
          
          <button
            onClick={handleAddSkill}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 whitespace-nowrap"
            aria-label="Adicionar habilidade"
          >
            Adicionar
          </button>
        </div>

        <div className="space-y-2">
          {skills.map(skill => (
            <div key={skill.id} className="flex justify-between items-center p-3 bg-white rounded border">
              <div>
                <span className="font-medium text-gray-800">{skill.name}</span>
                <span className="text-sm text-gray-500 ml-2">({skill.level})</span>
              </div>
              <button
                onClick={() => onRemoveSkill(skill.id)}
                className="text-red-500 hover:text-red-700 px-2 py-1"
                aria-label={`Remover habilidade ${skill.name}`}
              >
                Remover
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills