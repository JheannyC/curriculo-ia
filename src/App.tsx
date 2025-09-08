import "./App.css";
import { useState } from "react";
import FormSection from "./components/Layout/FormSection";
import PreviewSection from "./components/Layout/PreviewSection";
import type { Experiencia, Skill, DadosPessoais } from "./types/cv.types";
import Skills from "./components/Form/Skills";
import Experience from "./components/Form/Experience";
import CVPreview from "./components/Preview/CVPreview";
import PersonalInfo from "./components/Form/PersonalInfo";

export default function App() {
  const [pessoal, setPessoal] = useState<DadosPessoais>({
    nome: "",
    email: "",
    telefone: "",
    linkedin: "",
    resumo: "",
  });
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const updatePessoal = (patch: Partial<DadosPessoais>) => {
    setPessoal((prev) => ({ ...prev, ...patch }));
  }

  const addExperiencia = (exp: Experiencia) =>
    setExperiencias((prev) => [...prev, exp]);

  const removeExperiencia = (index: number) =>
    setExperiencias((prev) => prev.filter((_, i) => i !== index));

  const adicionarSkill = (skillData: Omit<Skill, 'id'>) => {
    const novaSkill: Skill = {
      ...skillData,
      id: Date.now().toString()
    };
    setSkills(prev => [...prev, novaSkill]);
  };

  const removerSkill = (id: string) => {
    setSkills(prev => prev.filter(skill => skill.id !== id));
  };


  return (
    <div className="h-dvh flex flex-col">

      <header className="flex items-center justify-between px-4 py-3 bg-white border-b flex-none">
        <div className="flex items-center gap-3">
          <span className="logo" aria-hidden="true"></span>
          <div>
            <strong>Gerador de Currículos IA</strong>
            <div className="subtitle text-sm text-gray-500">
              Gerador Inteligente de Currículos com IA
            </div>
          </div>
        </div>

        <div className="actions flex items-center gap-2">
          <label className="api-key flex items-center gap-2 border rounded px-2 py-1">
            <span>🔐</span>
            <input
              type="text"
              placeholder="Cole sua API Key"
              aria-label="API Key"
              className="outline-none"
            />
          </label>
          <button className="btn border rounded px-3 py-2" id="btnExport">
            Exportar PDF
          </button>
        </div>
      </header>

      <main className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <div className="space-y-6">

          <FormSection title="Informações Pessoais">
            <PersonalInfo
              personalInfo={pessoal}
              onUpdate={updatePessoal}
            />
            <Skills
              skills={skills}
              onAddSkill={adicionarSkill}
              onRemoveSkill={removerSkill}
            />
            <Experience
              onAdd={addExperiencia}
              experiencias={experiencias}
              onRemove={removeExperiencia}
            />
          </FormSection>

        </div>

        <PreviewSection>
          <CVPreview
            nome={pessoal.nome}
            experiencias={experiencias}
            email={pessoal.email}
            telefone={pessoal.telefone}
            linkedin={pessoal.linkedin}
            resumo={pessoal.resumo}
            skills={skills}
          />
        </PreviewSection>
      </main>
    </div>
  );
}

