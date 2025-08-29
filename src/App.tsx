import { useState } from 'react'
import FormSection from './components/Layout/FormSection'
import PreviewSection from './components/Layout/PreviewSection'
import ToastContainer from './components/UI/ToastContainer'
import { CVData } from './types/cv.types'
import ErrorBoundary from './components/UI/ErrorBoundary'

const initialCVData: CVData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    summary: ''
  },
  skills: [],
  experiences: []
}

function App() {
  const [cvData, setCVData] = useState<CVData>(initialCVData)

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-100">
        <FormSection cvData={cvData} setCVData={setCVData} />
        <PreviewSection cvData={cvData} />
        <ToastContainer />
      </div>
    </ErrorBoundary>
  )
}

export default App