import React, { useState, type ChangeEvent } from 'react';
import type { Experience as ExperienceType } from '../../types/cv.types'

interface ExperienceProps {
  experiences: ExperienceType[];
  onAdd: (experience: Omit<ExperienceType, 'id'>) => void;
  onRemove: (id: string) => void;
}

const Experience: React.FC<ExperienceProps> = ({ experiences, onAdd, onRemove }) => {
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false,
    location: ''
  });

  const handleAddExperience = () => {
    if (newExperience.company.trim() && newExperience.position.trim()) {
      onAdd({
        company: newExperience.company.trim(),
        position: newExperience.position.trim(),
        startDate: newExperience.startDate,
        endDate: newExperience.current ? '' : newExperience.endDate,
        current: newExperience.current,
        description: newExperience.description,
        location: newExperience.location
      });
      
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false,
        location: ''
      });
    }
  };

  const handleInputChange = (field: keyof typeof newExperience) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    
    setNewExperience(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função para formatar data no formato MM/AAAA - UX melhorada
  const formatDate = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    const limited = numbers.slice(0, 6);
    
    if (limited.length > 2) {
      return `${limited.slice(0, 2)}/${limited.slice(2)}`;
    }
    
    return limited;
  };

  const handleDateChange = (field: 'startDate' | 'endDate') => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const formattedDate = formatDate(e.target.value);
    setNewExperience(prev => ({
      ...prev,
      [field]: formattedDate
    }));
  };

  const handleCurrentJobChange = (checked: boolean) => {
    setNewExperience(prev => ({
      ...prev,
      current: checked,
      endDate: checked ? '' : prev.endDate
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Experiência Profissional</h2>
      
      <div className="space-y-6">
        {/* Formulário para adicionar nova experiência */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-gray-700">Adicionar Experiência</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Empresa *
              </label>
              <input
                id="company"
                type="text"
                value={newExperience.company}
                onChange={handleInputChange('company')}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nome da empresa"
                required
                aria-required="true"
              />
            </div>
            
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                Cargo *
              </label>
              <input
                id="position"
                type="text"
                value={newExperience.position}
                onChange={handleInputChange('position')}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Seu cargo"
                required
                aria-required="true"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Data de Início *
              </label>
              <input
                id="startDate"
                type="text"
                value={newExperience.startDate}
                onChange={handleDateChange('startDate')}
                placeholder="MM/AAAA"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Data de início do trabalho"
                maxLength={7}
                required
                aria-required="true"
              />
            </div>
            
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                Data de Término
              </label>
              <input
                id="endDate"
                type="text"
                value={newExperience.endDate}
                onChange={handleDateChange('endDate')}
                disabled={newExperience.current}
                placeholder={newExperience.current ? "Atual" : "MM/AAAA"}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                aria-label="Data de término do trabalho"
                maxLength={7}
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Localidade (opcional)
            </label>
            <input
              id="location"
              type="text"
              value={newExperience.location}
              onChange={handleInputChange('location')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: São Paulo/SP, Remoto"
              aria-label="Localidade do trabalho"
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="currentJob"
              type="checkbox"
              checked={newExperience.current}
              onChange={(e) => handleCurrentJobChange(e.target.checked)}
              className="mr-2 focus:ring-2 focus:ring-blue-500"
              aria-label="Trabalho atual"
            />
            <label htmlFor="currentJob" className="text-sm text-gray-700">
              Trabalho atual
            </label>
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              id="description"
              value={newExperience.description}
              onChange={handleInputChange('description')}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Descreva suas responsabilidades e conquistas..."
              aria-label="Descrição das responsabilidades"
            />
          </div>
          
          <button
            onClick={handleAddExperience}
            disabled={!newExperience.company.trim() || !newExperience.position.trim() || !newExperience.startDate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            aria-label="Adicionar experiência"
          >
            Adicionar Experiência
          </button>
        </div>
        
        {/* Lista de experiências */}
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="p-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-800">{exp.position}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  {exp.location && (
                    <p className="text-sm text-gray-500">{exp.location}</p>
                  )}
                </div>
                <button
                  onClick={() => onRemove(exp.id)}
                  className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                  aria-label={`Remover experiência na ${exp.company}`}
                >
                  Remover
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mb-2">
                {exp.startDate} - {exp.current ? 'Presente' : exp.endDate}
                {exp.current && (
                  <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Atual
                  </span>
                )}
              </p>
              
              {exp.description && (
                <p className="text-gray-700 text-sm whitespace-pre-line">{exp.description}</p>
              )}
            </div>
          ))}
          
          {experiences.length === 0 && (
            <p className="text-gray-500 text-center py-4 italic">
              Nenhuma experiência adicionada
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;