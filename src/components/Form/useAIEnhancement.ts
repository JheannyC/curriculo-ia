import { useState } from 'react'
import { AIRequest, AIResponse } from '../../types/api.types'
import { useToast } from '../../hooks/useToast'
import { enhanceText } from '../../services/aiService'

export const useAIEnhancement = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { success, error: showError } = useToast()

  const enhance = async (request: AIRequest): Promise<AIResponse> => {
    setIsLoading(true)
    
    try {
      console.log('Enhancing text with AI:', request)
      const result = await enhanceText(request)
      
      if (result.success) {
        success('Texto melhorado com IA!', 2000)
      } else {
        showError(result.error || 'Erro ao melhorar texto', 3000)
      }
      
      return result
    } catch (err) {
      console.error('Error in AI enhancement:', err)
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      showError(errorMessage, 3000)
      return {
        enhancedText: request.text,
        success: false,
        error: errorMessage
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    enhance,
    isLoading
  }
}