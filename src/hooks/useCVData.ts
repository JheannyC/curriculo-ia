// hooks/useCVData.ts
import { useState } from 'react';
import type { CVData } from '../types/cv.types';

export const useCVData = (initialData?: Partial<CVData>) => {
  const defaultCVData: CVData = {
    skills: [],
  };

  const [cvData, setCVData] = useState<CVData>({
    ...defaultCVData,
    ...initialData
  });

  const resetCVData = () => {
    setCVData(defaultCVData);
  };

  return {
    cvData,
    setCVData,
    resetCVData
  };
};
