export type Experiencia = {
  cargo: string;
  empresa: string;
  periodo: string;   // por enquanto texto
  local: string;
  descricao: string;
};

export type SkillLevel = 'Básico' | 'Intermediário' | 'Avançado'
export interface Skill {
  id: string
  name: string
  level: SkillLevel
};

export interface PreviewSectionProps {
  experiencias: Experiencia[];
  skills: Skill[]; 
}