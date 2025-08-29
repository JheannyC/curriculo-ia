export interface AIRequest {
  text: string
  context: 'summary' | 'experience'
}

export interface AIResponse {
  enhancedText: string
  success: boolean
  error?: string
}