import React from 'react'
import AIEnhanceButton from './AIEnhanceButton'
import { PersonalInfo as PersonalInfoType } from '../../types/cv.types'

interface PersonalInfoProps {
  personalInfo: PersonalInfoType
  setPersonalInfo: (info: Partial<PersonalInfoType>) => void
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ personalInfo, setPersonalInfo }) => {
  const handleChange = (field: keyof PersonalInfoType) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPersonalInfo({ [field]: e.target.value })
  }

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Dados Pessoais</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo
          </label>
          <input
            id="name"
            type="text"
            value={personalInfo.name}
            onChange={handleChange('name')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Seu nome completo"
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={handleChange('email')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="seu.email@exemplo.com"
            aria-required="true"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefone
          </label>
          <input
            id="phone"
            type="tel"
            value={personalInfo.phone}
            onChange={handleChange('phone')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="(11) 99999-9999"
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            id="linkedin"
            type="url"
            value={personalInfo.linkedin}
            onChange={handleChange('linkedin')}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://linkedin.com/in/seu-perfil"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
              Resumo Profissional
            </label>
            <AIEnhanceButton
              text={personalInfo.summary}
              context="summary"
              onEnhanced={(enhancedText) => setPersonalInfo({ summary: enhancedText })}
            />
          </div>
          <textarea
            id="summary"
            value={personalInfo.summary}
            onChange={handleChange('summary')}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Descreva brevemente sua experiência e objetivos profissionais..."
            aria-label="Resumo profissional"
          />
          <p className="text-xs text-gray-500 mt-1">{personalInfo.summary.length}/500 caracteres</p>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo