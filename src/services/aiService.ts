import type {
  GenerateContentResponse,
  GoogleApiErrorPayload,
  ApiError,
} from "../types/api.types";

import { mapApiError } from "../utils/validation";

const URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
let userApiKey = "";

export async function sendRequest(
  apiKey: string,
  body: unknown,
) {
  userApiKey = apiKey;
  try {
    const response = await fetch(`${URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "X-goog-api-key": `${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      const payload = (data ?? {}) as GoogleApiErrorPayload;
    const msg = mapApiError(payload?.error?.code, payload?.error?.message);

    const err = new Error(msg) as ApiError;
    err.status = response.status;
    err.code = payload?.error?.code;
    err.raw = data;
    throw err;
    }

  

    return (data || {}) as GenerateContentResponse;

  } catch (error: any) {
    
    throw error;
  }

}