import { useState } from 'react';
import { useToast } from './useToast';

export const useAIEnhancement = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const enhanceText = async (text: string, context: string, apiKey: string) => {
    if (!apiKey) {
      showToast('error', 'Chave de API não configurada');
      return text;
    }

    setLoading(true);
    try {
      // Simulação de processamento com IA
      await new Promise(resolve => setTimeout(resolve, 1500));
      return `Texto melhorado com IA: ${text}`;
    } catch (error) {
      showToast('error', 'Erro ao processar com IA');
      return text;
    } finally {
      setLoading(false);
    }
  };

  return {
    enhanceText,
    loading
  };
};