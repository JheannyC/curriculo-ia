import React, { useState } from 'react';
import type { DadosPessoais } from '../../types/cv.types';
import AIEnhanceButton from './AIEnhanceButton';

interface PersonalInfoProps {
  personalInfo: DadosPessoais;
  onUpdate: (personal: Partial<DadosPessoais>) => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ personalInfo, onUpdate }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
    onUpdate({ [name]: value });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Email inválido";
        } else {
          delete newErrors.email;
        }
        break;

      case 'telefone':
        if (value && !/^[0-9+\s\(\)\-]+$/.test(value)) {
          newErrors.telefone = "Apenas números, +, espaços e ()-";
        } else {
          delete newErrors.telefone;
        }
        break;

      case 'linkedin':
        if (value && !value.includes('linkedin.com')) {
          newErrors.linkedin = "Link inválido! Insira um link do LinkedIn";
        } else {
          delete newErrors.linkedin;
        }
        break;

      case 'nome':
        if (!value.trim()) {
          newErrors.nome = "Favor insira o seu nome completo";
        } else {
          delete newErrors.nome;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Dados Pessoais</h3>

      {/* Nome Completo - Obrigatório */}
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
          Nome Completo <span className="text-red-600" aria-hidden="true">*</span>
          <span className="sr-only">(obrigatório)</span>
        </label>
        <input
          id="nome"
          type="text"
          name="nome"
          value={personalInfo.nome}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full border px-3 py-2 rounded ${errors.nome ? 'border-red-500' : 'border-gray-300'
            }`}
          placeholder="Seu nome completo"
          required
          aria-required="true"
          aria-invalid={!!errors.nome}
          aria-describedby={errors.nome ? 'error-nome' : undefined}
        />
        {errors.nome && (
          <p id="error-nome" className="text-red-600 text-sm mt-1">{errors.nome}</p>
        )}
      </div>

      {/* Email e Telefone - Grid Responsivo */}
      <div className="grid grid-cols-2 gap-4">
        {/* Email - Obrigatório */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-600" aria-hidden="true">*</span>
            <span className="sr-only">(obrigatório)</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border px-3 py-2 rounded ${errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="seu@email.com"
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'error-email' : undefined}
          />
          {errors.email && (
            <p id="error-email" className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Telefone - Opcional */}
        <div>
          <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefone
          </label>
          <input
            id="telefone"
            type="tel"
            name="telefone"
            value={personalInfo.telefone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border px-3 py-2 rounded ${errors.telefone ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="(00) 00000-0000"
            aria-label="Número de telefone"
            aria-invalid={!!errors.telefone}
            aria-describedby={errors.telefone ? 'error-telefone' : undefined}
          />
          {errors.telefone && (
            <p id="error-telefone" className="text-red-600 text-sm mt-1">{errors.telefone}</p>
          )}
        </div>
      </div>

      {/* LinkedIn - Opcional */}
      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
          LinkedIn
        </label>
        <input
          id="linkedin"
          type="url"
          name="linkedin"
          value={personalInfo.linkedin}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full border px-3 py-2 rounded ${errors.linkedin ? 'border-red-500' : 'border-gray-300'
            }`}
          placeholder="https://linkedin.com/in/seuperfil"
          aria-label="Perfil do LinkedIn"
          aria-invalid={!!errors.linkedin}
          aria-describedby={errors.linkedin ? 'error-linkedin' : undefined}
        />
        {errors.linkedin && (
          <p id="error-linkedin" className="text-red-600 text-sm mt-1">{errors.linkedin}</p>
        )}
      </div>

      {/* Resumo Profissional - Opcional com Contador */}
      <div>
        <label htmlFor="resumo" className="block text-sm font-medium text-gray-700 mb-1">
          Resumo Profissional
          <span className="text-xs text-gray-500 ml-2">
            {personalInfo.resumo.length}/500 caracteres
          </span>
        </label>
        <textarea
          id="resumo"
          name="resumo"
          value={personalInfo.resumo}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={500}
          rows={4}
          className="w-full border px-3 py-2 rounded border-gray-300"
          placeholder="Descreva brevemente sua experiência e objetivos profissionais"
          aria-label="Resumo profissional"
        />
        <AIEnhanceButton
          onEnhance={() => console.log("Melhorar Resumo:", personalInfo.resumo)}
        />
      </div>

      {/* Legenda de Campos Obrigatórios - Acessibilidade */}
      <div className="text-xs text-gray-500" aria-live="polite">
        <span className="text-red-600">*</span> Campos obrigatórios
      </div>
    </div>
  );
};

export default PersonalInfo;