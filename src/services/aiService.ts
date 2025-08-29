import { AIRequest, AIResponse } from '../types/api.types'

// Esta é uma implementação mock para desenvolvimento
// Em produção, substitua pela integração real com a API da OpenAI
export const enhanceText = async (request: AIRequest): Promise<AIResponse> => {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const { text, context } = request
  
  if (!text.trim()) {
    return {
      enhancedText: text,
      success: false,
      error: 'Texto vazio não pode ser melhorado'
    }
  }

  // Mock de melhoria baseada no contexto
  let enhancedText = text
  
  if (context === 'summary') {
    enhancedText = `Profissional ${text.toLowerCase()} com sólida experiência no mercado. ${text} capacitado para entregar resultados excepcionais através de abordagens inovadoras e foco na excelência.`
  } else if (context === 'experience') {
    enhancedText = `• ${text.charAt(0).toUpperCase() + text.slice(1)}
• Implementei soluções eficazes para desafios complexos
• Colaborei com equipes multifuncionais para alcançar objetivos
• Otimizei processos resultando em aumento de eficiência`
  }

  return {
    enhancedText,
    success: true
  }
}

// Função para integração real com OpenAI (exemplo)
export const enhanceTextWithOpenAI = async (request: AIRequest): Promise<AIResponse> => {
  try {
    // Em produção, use sua API key da OpenAI
    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
    
    if (!API_KEY) {
      throw new Error('Chave API da OpenAI não configurada')
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente especializado em melhorar textos de currículos. Melhore o texto fornecendo versões mais profissionais e impactantes.'
          },
          {
            role: 'user',
            content: `Melhore este texto para ${request.context === 'summary' ? 'um resumo profissional' : 'descrição de experiência'}: ${request.text}`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.statusText}`)
    }

    const data = await response.json()
    const enhancedText = data.choices[0]?.message?.content?.trim() || request.text

    return {
      enhancedText,
      success: true
    }

  } catch (error) {
    console.error('Erro ao chamar OpenAI:', error)
    return {
      enhancedText: request.text,
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido na API'
    }
  }
}