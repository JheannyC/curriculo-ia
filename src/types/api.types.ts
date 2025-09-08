export type ModelId = "gemini-2.0-flash";

export interface Part {
  text?: string;
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
}

export interface GenerateContentRequest {
  contents: Content[];
  system_instruction?: SystemInstruction;
  generationConfig?: GenerationConfig;
  safetySettings?: unknown;
}

export interface Candidate {
  content: Content;
  finishReason?: string;
  index?: number;
}

export interface GenerateContentResponse {
  candidates?: Candidate[];
  promptFeedback?: unknown;
}

export interface GoogleApiErrorPayload {
  error?: {
    code?: number;
    message?: string;
    status?: string;
    details?: unknown[];
  };
}

export interface ApiError extends Error {
  status?: number;
  code?: number;
  raw?: unknown;
}