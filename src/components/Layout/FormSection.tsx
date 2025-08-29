import React from 'react'
import { CVData } from '../../types/cv.types'
import PersonalInfo from '../Form/PersonalInfo'
import Skills from '../Form/Skills'
import Experience from '../Form/Experience'

interface FormSectionProps {
  cvData: CVData
  setCVData: React.Dispatch<React.SetStateAction<CVData>>
}

const FormSection: React.FC<FormSectionProps> = ({ cvData, setCVData }) => {
  return (
    <div className="w-1/2 h-full overflow-y-auto bg-white p-6 border-r border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">CV Builder AI</h1>
      
      <PersonalInfo 
        personalInfo={cvData.personalInfo} 
        setPersonalInfo={(info) => setCVData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, ...info }
        }))} 
      />
      
      <Skills 
        skills={cvData.skills} 
        onAddSkill={(skill) => setCVData(prev => ({
          ...prev,
          skills: [...prev.skills, { ...skill, id: Date.now().toString() }]
        }))}
        onRemoveSkill={(id) => setCVData(prev => ({
          ...prev,
          skills: prev.skills.filter(skill => skill.id !== id)
        }))}
      />
      
      <Experience 
        experiences={cvData.experiences} 
        onAddExperience={(exp) => setCVData(prev => ({
          ...prev,
          experiences: [...prev.experiences, { ...exp, id: Date.now().toString() }]
        }))}
        onRemoveExperience={(id) => setCVData(prev => ({
          ...prev,
          experiences: prev.experiences.filter(experience => experience.id !== id)
        }))}
      />
    </div>
  )
}

export default FormSection