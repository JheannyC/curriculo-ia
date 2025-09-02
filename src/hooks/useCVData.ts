import { useState, useEffect, useCallback } from 'react';
import type { CVData, PersonalInfo, Skill, Experience } from '../types/cv.types';

// Chave para localStorage
const CV_DATA_KEY = 'cv-data';

export const useCVData = () => {
  const [cvData, setCVData] = useState<CVData>({
    personal: {
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      summary: ''
    },
    skills: [],
    experiences: []
  });

  // Carrega dados do localStorage na inicialização
  useEffect(() => {
    const savedData = localStorage.getItem(CV_DATA_KEY);
    if (savedData) {
      try {
        setCVData(JSON.parse(savedData));
      } catch (error) {
        console.error('Erro ao carregar dados do localStorage:', error);
      }
    }
  }, []);

  // Salva dados no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(CV_DATA_KEY, JSON.stringify(cvData));
  }, [cvData]);

  const updatePersonalInfo = useCallback((info: Partial<PersonalInfo>) => {
    setCVData(prev => ({
      ...prev,
      personal: { ...prev.personal, ...info }
    }));
  }, []);

  const addSkill = useCallback((skill: Omit<Skill, 'id'>) => {
    const newSkill: Skill = {
      ...skill,
      id: Date.now().toString()
    };
    setCVData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  }, []);

  const updateSkill = useCallback((id: string, updates: Partial<Skill>) => {
    setCVData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, ...updates } : skill
      )
    }));
  }, []);

  const removeSkill = useCallback((id: string) => {
    setCVData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  }, []);

  const addExperience = useCallback((experience: Omit<Experience, 'id'>) => {
    const newExperience: Experience = {
      ...experience,
      id: Date.now().toString()
    };
    setCVData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience]
    }));
  }, []);

  const updateExperience = useCallback((id: string, updates: Partial<Experience>) => {
    setCVData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp =>
        exp.id === id ? { ...exp, ...updates } : exp
      )
    }));
  }, []);

  const removeExperience = useCallback((id: string) => {
    setCVData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  }, []);

  const resetCVData = useCallback(() => {
    setCVData({
      personal: {
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        summary: ''
      },
      skills: [],
      experiences: []
    });
    localStorage.removeItem(CV_DATA_KEY);
  }, []);

  return {
    cvData,
    setCVData,
    updatePersonalInfo,
    addSkill,
    updateSkill,
    removeSkill,
    addExperience,
    updateExperience,
    removeExperience,
    resetCVData
  };
};

export type UseCVDataReturn = ReturnType<typeof useCVData>;