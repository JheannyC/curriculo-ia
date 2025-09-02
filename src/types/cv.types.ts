export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'Básico' | 'Intermediário' | 'Avançado';
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location?: string;
}

export interface CVData {
  personal: PersonalInfo;
  skills: Skill[];
  experiences: Experience[];
}

export type Section = 'personal' | 'skills' | 'experiences';