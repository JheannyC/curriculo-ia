import React from 'react'
import { CVData } from '../../types/cv.types'
import CVPreview from '../Preview/CVPreview'

interface PreviewSectionProps {
  cvData: CVData
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ cvData }) => {
  return (
    <div className="w-1/2 h-full overflow-y-auto bg-gray-50 p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Preview do Currículo</h2>
      <CVPreview cvData={cvData} />
    </div>
  )
}

export default PreviewSection