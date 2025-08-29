import React, { useState, ChangeEvent } from 'react'
import AIEnhanceButton from './AIEnhanceButton'
import { Experience as ExperienceType } from '../../types/cv.types'

interface ExperienceProps {
  experiences: ExperienceType[]
  onAddExperience: (experience: Omit<ExperienceType, 'id'>) => void
  onRemoveExperience: (id: string) => void
}

const Experience: React.FC<ExperienceProps> = ({ experiences, onAddExperience, onRemoveExperience }) => {
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false
  })

  const handleAddExperience = () => {
    if (newExperience.company.trim() && newExperience.position.trim()) {
      onAddExperience(newExperience)
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false
      })
    }
  }

  const handleCurrentJobChange = (checked: boolean) => {
    setNewExperience(prev => ({
      ...prev,
      current: checked,
      endDate: checked ? '' : prev.endDate
    }))
  }

  const handleInputChange = (field: keyof typeof newExperience) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value
    
    setNewExperience(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Função para formatar data no formato MM/AAAA
  const formatDate = (value: string): string => {
    // Remove qualquer caractere não numérico
    const numbers = value.replace(/\D/g, '')
    
    // Limita a 6 dígitos (MMAAAA)
    const limited = numbers.slice(0, 6)
    
    // Adiciona a barra após 2 dígitos
    if (limited.length > 2) {
      return `${limited.slice(0, 2)}/${limited.slice(2)}`
    }
    
    return limited
  }

  const handleDateChange = (field: 'startDate' | 'endDate') => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const formattedDate = formatDate(e.target.value)
    setNewExperience(prev => ({
      ...prev,
      [field]: formattedDate
    }))
  }

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Experiência Profissional</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Empresa
            </label>
            <input
              id="company"
              type="text"
              value={newExperience.company}
              onChange={handleInputChange('company')}
              placeholder="Nome da empresa"
              className="w-full p-2 border border-gray-300 rounded-md"
              aria-label="Nome da empresa"
            />
          </div>
          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
              Cargo
            </label>
            <input
              id="position"
              type="text"
              value={newExperience.position}
              onChange={handleInputChange('position')}
              placeholder="Seu cargo na empresa"
              className="w-full p-2 border border-gray-300 rounded-md"
              aria-label="Cargo na empresa"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Data de Início
            </label>
            <input
              id="startDate"
              type="text"
              value={newExperience.startDate}
              onChange={handleDateChange('startDate')}
              placeholder="MM/AAAA"
              className="w-full p-2 border border-gray-300 rounded-md"
              aria-label="Data de início do trabalho"
              maxLength={7}
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              Data de Término
            </label>
            <input
              id="endDate"
              type="text"
              value={newExperience.endDate}
              onChange={handleDateChange('endDate')}
              disabled={newExperience.current}
              placeholder={newExperience.current ? "Atual" : "MM/AAAA"}
              className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
              aria-label="Data de término do trabalho"
              maxLength={7}
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="currentJob"
            type="checkbox"
            checked={newExperience.current}
            onChange={(e) => handleCurrentJobChange(e.target.checked)}
            className="mr-2"
            aria-label="Trabalho atual"
          />
          <label htmlFor="currentJob" className="text-sm text-gray-700">
            Trabalho atual
          </label>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <AIEnhanceButton
              text={newExperience.description}
              context="experience"
              onEnhanced={(enhancedText) => setNewExperience(prev => ({ ...prev, description: enhancedText }))}
            />
          </div>
          <textarea
            id="description"
            value={newExperience.description}
            onChange={handleInputChange('description')}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Descreva suas responsabilidades e conquistas..."
            aria-label="Descrição das responsabilidades"
          />
        </div>

        <button
          onClick={handleAddExperience}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          aria-label="Adicionar experiência"
        >
          Adicionar Experiência
        </button>

        <div className="space-y-3">
          {experiences.map(exp => (
            <div key={exp.id} className="p-3 bg-white rounded border">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{exp.position}</h4>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                  </p>
                  <p className="text-sm mt-1">{exp.description}</p>
                </div>
                <button
                  onClick={() => onRemoveExperience(exp.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                  aria-label={`Remover experiência na ${exp.company}`}
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience