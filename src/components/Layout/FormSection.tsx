import React from 'react';
import PersonalInfo from '../Form/PersonalInfo';
import Skills from '../Form/Skills';
import Experience from '../Form/Experience';
import type { UseCVDataReturn } from '../../hooks/useCVData';

interface FormSectionProps {
  cvData: UseCVDataReturn;
  onAIEnhance: () => void;
  aiLoading?: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({ cvData, onAIEnhance, aiLoading = false }) => {
  return (
    <section className="bg-white border rounded-xl shadow p-6 h-full min-h-0 overflow-y-auto">
      <h2 className="font-bold text-lg px-5 pt-5 border-b">Informações do Currículo</h2>
      
      <div className="px-5 py-4 space-y-3 pr-3 scroll-area">
        <PersonalInfo 
          personalInfo={cvData.cvData.personal} 
          onUpdate={cvData.updatePersonalInfo} 
        />
        <Skills 
          skills={cvData.cvData.skills} 
          onAddSkill={cvData.addSkill} 
          onRemoveSkill={cvData.removeSkill} 
        />
        <Experience 
          experiences={cvData.cvData.experiences} 
          onAdd={cvData.addExperience} 
          onRemove={cvData.removeExperience}
          onUpdate={cvData.updateExperience}
        />
      </div>
    </section>
  );
};

export default FormSection;