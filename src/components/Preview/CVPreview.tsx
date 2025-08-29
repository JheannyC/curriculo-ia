import React from 'react'
import { CVData } from '../../types/cv.types'
import PersonalHeader from './PersonalHeader'
import SkillsSection from './SkillsSection'
import ExperienceSection from './ExperienceSection'

interface CVPreviewProps {
  cvData: CVData
}

const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <PersonalHeader personalInfo={cvData.personalInfo} />
      <div className="mt-6">
        <SkillsSection skills={cvData.skills} />
        <ExperienceSection experiences={cvData.experiences} />
      </div>
    </div>
  )
}

export default CVPreview