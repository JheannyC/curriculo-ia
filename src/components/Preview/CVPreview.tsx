import type { Experiencia } from "../../types/cv.types";
import PersonalHeader from "./PersonalHeader";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";

export type Skill = {
  nome: string;
  nivel: "Básico" | "Intermediário" | "Avançado";
};

type CVPreviewProps = {
  // dados pessoais (virão do formulário no futuro)
  nome?: string;
  email?: string;
  telefone?: string;
  linkedin?: string;
  resumo?: string;

  // habilidades (virão do formulário no futuro)
  skills?: Skill[];

  // já existente hoje:
  experiencias: Experiencia[];
};

export default function CVPreview({
  nome,
  email,
  telefone,
  linkedin,
  resumo,
  skills,
  experiencias,
}: CVPreviewProps) {
  return (
    <div id="cv-root" className="p-8">
      <div className="max-w-[820px] mx-auto">
        <PersonalHeader
          nome={nome}
          email={email}
          telefone={telefone}
          linkedin={linkedin}
          resumo={resumo}
        />

        <div className="mt-8 grid grid-cols-1 gap-8">
          <SkillsSection skills={skills} />

          <ExperienceSection experiencias={experiencias} />
        </div>
      </div>
    </div>
  );
}
