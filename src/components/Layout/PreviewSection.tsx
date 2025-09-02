import React from 'react'
import CVPreview from '../Preview/CVPreview'
import type { CVData } from '../../types/cv.types'

interface PreviewSectionProps {
  cvData: CVData
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ cvData }) => {
  return (
    <aside className="bg-white border rounded-xl shadow p-6 h-full min-h-0 overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Visualização do Currículo</h2>
      <CVPreview cvData={cvData} />
    </aside>
  )
}

export default PreviewSection