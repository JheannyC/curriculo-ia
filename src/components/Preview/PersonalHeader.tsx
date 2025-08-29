import React from 'react'
import { PersonalInfo } from '../../types/cv.types'

interface PersonalHeaderProps {
  personalInfo: PersonalInfo
}

const PersonalHeader: React.FC<PersonalHeaderProps> = ({ personalInfo }) => {
  return (
    <div className="text-center border-b border-gray-200 pb-6">
      <h1 className="text-2xl font-bold text-gray-800">{personalInfo.name || 'Seu Nome'}</h1>
      <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.linkedin && (
          <a href={personalInfo.linkedin} className="text-blue-600 hover:underline">
            LinkedIn
          </a>
        )}
      </div>
      {personalInfo.summary && (
        <p className="mt-4 text-gray-700 text-sm leading-relaxed">{personalInfo.summary}</p>
      )}
    </div>
  )
}

export default PersonalHeader