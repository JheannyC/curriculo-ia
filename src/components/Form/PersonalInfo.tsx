import React from 'react';
import type { PersonalInfo as PersonalInfoType } from '../../types/cv.types'; //  Tipos explícitos

interface PersonalInfoProps {
  personalInfo: PersonalInfoType; //  Recebe dados via props
  onUpdate: (personal: Partial<PersonalInfoType>) => void; // Usa Callback para atualizar
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ personalInfo, onUpdate }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value }); // Atualização em tempo real
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Dados Pessoais</h2>
      
      <div className="space-y-4">
        {/* Nome Completo - Campo obrigatório */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome Completo *
          </label>
          <input
            type="text"
            name="name"
            value={personalInfo.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Seu nome completo"
            required // Validação HTML5 nativa
            aria-required="true" //acessibilidade assim como o aria-label
          />
        </div>
        
        {/* Email e Telefone - Layout responsivo */}
        <div className="grid grid-cols-2 gap-4">
          {/* Email - Campo obrigatório */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email" // Tipo email para validação nativa
              name="email"
              value={personalInfo.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="seu@email.com"
              required
              aria-required="true"
            />
          </div>
          
          {/* Telefone - Opcional */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <input
              type="tel" // Tipo tel para dispositivos móveis
              name="phone"
              value={personalInfo.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="(00) 00000-0000"
              aria-label="Número de telefone"
            />
          </div>
        </div>
        
        {/* LinkedIn - Opcional */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            type="url"
            name="linkedin"
            value={personalInfo.linkedin}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://linkedin.com/in/seuperfil"
            aria-label="Perfil do LinkedIn"
          />
        </div>
        
        {/* Resumo Profissional - Com contador de caracteres */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resumo Profissional
            <span className="text-xs text-gray-500 ml-2">
              {personalInfo.summary.length}/500 caracteres
            </span>
          </label>
          <textarea
            name="summary"
            value={personalInfo.summary}
            onChange={handleChange}
            maxLength={500}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Descreva brevemente sua experiência e objetivos profissionais"
            aria-label="Resumo profissional"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;