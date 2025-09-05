import { useState } from "react";
import type { Skill, SkillLevel } from "../../types/cv.types";

type Props = {
  skills: Skill[];
  onAddSkill: (skill: Omit<Skill, 'id'>) => void;
  onRemoveSkill: (id: string) => void;
};

export default function Skills({ skills, onAddSkill, onRemoveSkill }: Props) {
  const [nome, setNome] = useState("");
  const [nivel, setNivel] = useState<SkillLevel>("Básico");
  const [erros, setErros] = useState<{ nome?: string }>({});

  const adicionar = () => {
    const e = validar();
    setErros(e);
    if (Object.keys(e).length) return;

    if (!nome.trim()) return;
    
    onAddSkill({
      name: nome.trim(),
      level: nivel
    });
    
    setNome("");
    setNivel("Básico");
  };

  const validar = (): { nome?: string } => {
    const e: { nome?: string } = {};
    
    if (!nome.trim()) {
      e.nome = "Informe o nome da habilidade.";
    }

    return e;
  };

  return (
    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Habilidades</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
              Nome da Habilidade
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: JavaScript, React, Python"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-invalid={!!erros.nome}
            />
            {erros.nome && <p className="text-red-600 text-sm mt-1">{erros.nome}</p>}
          </div>

          <div>
            <label htmlFor="nivel" className="block text-sm font-medium text-gray-700 mb-1">
              Nível de Proficiência
            </label>
            <select
              value={nivel}
              onChange={(e) => setNivel(e.target.value as SkillLevel)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Básico">Básico</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={adicionar}
          disabled={!nome.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Adicionar Habilidade
        </button>

        <div className="space-y-2">
          {skills.map((skill) => (
            <div key={skill.id} className="border p-3 rounded flex justify-between items-center bg-white shadow-sm">
              <div>
                <strong className="text-gray-800">{skill.name}</strong>
                <span className="text-sm text-gray-500 ml-2">({skill.level})</span>
              </div>
              <button
                onClick={() => onRemoveSkill(skill.id)}
                className="text-red-600 hover:text-red-800 font-bold text-lg"
                aria-label={`Remover habilidade ${skill.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <p>Nenhuma habilidade adicionada ainda.</p>
            <p className="text-sm">Adicione suas habilidades acima.</p>
          </div>
        )}
      </div>
    </div>
  );
}