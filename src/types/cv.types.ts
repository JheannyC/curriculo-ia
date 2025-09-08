export type Experiencia = {
  cargo: string;
  empresa: string;
  periodo: string;   // por enquanto texto
  local: string;
  descricao: string;
};

export type DadosPessoais = {
  nome: string;
  email: string;
  telefone: string;
  linkedin: string;
  resumo: string;
};

export type CVData = {
  pessoal: DadosPessoais;
  experiencias: Experiencia[];
};

export type SkillLevel = 'Básico' | 'Intermediário' | 'Avançado';

export interface Skill {
  id: string;
  name: string;
  level: SkillLevel;
}

export interface PreviewSectionProps {
  experiencias: Experiencia[];
  skills: Skill[]; 
}