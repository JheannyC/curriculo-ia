// Modelo alvo (está embutido na URL do seu serviço)
export type ModelId = "gemini-2.0-flash";

// ====== Request ======
export interface Part {
  text?: string;
  // inlineData / fileData etc. podem ser adicionados no futuro
}

export interface Content {
  role?: "user" | "model";
  parts: Part[];
}

export interface SystemInstruction {
  parts: Part[];
}

export interface GenerationConfig {
  temperature?: number;
  topK?: number;
  topP?: number;
  maxOutputTokens?: number;
  // stopSequences?: string[];
}

export interface GenerateContentRequest {
  contents: Content[];                    // obrigatório
  system_instruction?: SystemInstruction; // opcional
  generationConfig?: GenerationConfig;    // opcional
  safetySettings?: unknown;               // se precisar, tipamos depois
}

// ====== Response ======
export interface Candidate {
  content: Content;
  finishReason?: string;
  index?: number;
  // safetyRatings?: Array<{category: string; probability: string;}>;
}

export interface GenerateContentResponse {
  candidates?: Candidate[];
  promptFeedback?: unknown;
}

// ====== Error shape (quando a API retorna erro) ======
export interface GoogleApiErrorPayload {
  error?: {
    code?: number;
    message?: string;
    status?: string;
    details?: unknown[];
  };
}

export interface ApiError extends Error {
  status?: number; // HTTP status
  code?: number;   // error.code da API
  raw?: unknown;   // corpo bruto da resposta (opcional)
}
