import { useState } from 'react'
import { CVData, PersonalInfo, Skill, Experience } from '../types/cv.types'

export const useCVData = () => {
  const [cvData, setCVData] = useState<CVData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      summary: ''
    },
    skills: [],
    experiences: []
  })

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setCVData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }))
  }

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skill,
      id: Date.now().toString()
    }
    setCVData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }))
  }

  const removeSkill = (id: string) => {
    setCVData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }))
  }

  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const newExperience: Experience = {
      ...experience,
      id: Date.now().toString()
    }
    setCVData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience]
    }))
  }

  const removeExperience = (id: string) => {
    setCVData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }))
  }

  return {
    cvData,
    setCVData,
    updatePersonalInfo,
    addSkill,
    removeSkill,
    addExperience,
    removeExperience
  }
}