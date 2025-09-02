import React, { useState,  type ChangeEvent } from 'react'; // 'type' aqui importa apenas como tipo e não como valor
import type { Skill } from '../../types/cv.types';

interface SkillsProps {
  skills: Skill[];
  onAddSkill: (skill: Omit<Skill, 'id'>) => void;
  onRemoveSkill: (id: string) => void;
}

const Skills: React.FC<SkillsProps> = ({ skills, onAddSkill, onRemoveSkill }) => {
  const [newSkill, setNewSkill] = useState<{ name: string; level: Skill['level'] }>({
    name: '', 
    level: 'Básico' 
  });

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      onAddSkill({
        name: newSkill.name.trim(),
        level: newSkill.level
      });
      setNewSkill({ name: '', level: 'Básico' });
    }
  };

  //  Funções separadas
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewSkill(prev => ({ ...prev, name: e.target.value }));
  };

  const handleLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setNewSkill(prev => ({ ...prev, level: e.target.value as Skill['level'] }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Habilidades</h2>
      
      <div className="space-y-4">
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label htmlFor="skillName" className="block text-sm font-medium text-gray-700 mb-1">
              Nome da habilidade *
            </label>
            <input
              id="skillName"
              type="text"
              value={newSkill.name}
              onChange={handleNameChange} // ✅ Alterado
              placeholder="Ex: JavaScript, React, Python"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              aria-required="true"
            />
          </div>
          
          <div>
            <label htmlFor="skillLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Nível
            </label>
            <select
              id="skillLevel"
              value={newSkill.level}
              onChange={handleLevelChange} // ✅ Alterado
              className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Nível de proficiência"
            >
              <option value="Básico">Básico</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>
          
          <button
            onClick={handleAddSkill}
            disabled={!newSkill.name.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Adicionar habilidade"
          >
            Adicionar
          </button>
        </div>

        {/* Lista de habilidades */}
        <div className="space-y-2">
          {skills.map(skill => (
            <div key={skill.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md border">
              <div>
                <span className="font-medium text-gray-800">{skill.name}</span>
                <span className="ml-2 text-sm text-gray-500">({skill.level})</span>
              </div>
              <button
                onClick={() => onRemoveSkill(skill.id)}
                className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                aria-label={`Remover habilidade ${skill.name}`}
              >
                Remover
              </button>
            </div>
          ))}
          
          {skills.length === 0 && (
            <p className="text-gray-500 text-center py-4 italic">
              Nenhuma habilidade adicionada
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;

