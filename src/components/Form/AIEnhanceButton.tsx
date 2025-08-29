import React from 'react'
import { useAIEnhancement } from '../../hooks/useAIEnhancement'
import LoadingSpinner from '../UI/LoadingSpinner'

interface AIEnhanceButtonProps {
  text: string
  context: 'summary' | 'experience'
  onEnhanced: (enhancedText: string) => void
}

const AIEnhanceButton: React.FC<AIEnhanceButtonProps> = ({ text, context, onEnhanced }) => {
  const { enhance, isLoading } = useAIEnhancement()

  const handleEnhance = async () => {
    if (!text.trim()) return
    
    const result = await enhance({ text, context })
    if (result.success) {
      onEnhanced(result.enhancedText)
    }
  }

  return (
    <button
      onClick={handleEnhance}
      disabled={isLoading || !text.trim()}
      className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="small" />
          Processando...
        </>
      ) : (
        <>
          <span>✨</span>
          Melhorar com IA
        </>
      )}
    </button>
  )
}

export default AIEnhanceButton