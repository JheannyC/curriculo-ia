export type SkillLevel = 'Básico' | 'Intermediário' | 'Avançado'

export interface PersonalInfo {
  name: string
  email: string
  phone: string
  linkedin: string
  summary: string
}

export interface Skill {
  id: string
  name: string
  level: SkillLevel
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  current: boolean
}

export interface CVData {
  personalInfo: PersonalInfo
  skills: Skill[]
  experiences: Experience[]
}