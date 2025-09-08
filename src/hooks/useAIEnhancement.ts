import type {
  GenerateContentRequest,
  GenerateContentResponse,
} from "../types/api.types";
import { sendRequest } from "../services/aiService";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";

export function improveSkills() {
  const { showToast } = useToast();
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateKey = useCallback(
    async (key: string) => {
      setApiKey(key);

      const payload: GenerateContentRequest = {
        contents: [{ parts: [{ text: "Teste de validação da API key" }] }],
      };

      try {
        await sendRequest(key, payload);
        showToast("success", "Autenticado com sucesso!");
        return true;
      } catch (e: unknown) {
        const msg = (e as Error)?.message || "Erro ao validar a chave.";
        showToast("error", msg);
        return false;
      }
    },
    [showToast]
  );

  const improveSkills = useCallback(
    async (text: string) => {
      if (!apiKey) {
        showToast?.("error", "Informe a API key antes.");
        return null;
      }
      if (!text?.trim()) {
        showToast("warning", "Digite alguma habilidade para melhorar.");
        return null;
      }

      setLoading(true);
      setError(null);
      setResult("");

      const body: GenerateContentRequest = {
        system_instruction: {
          parts: [
            {
              text: `Você é um especialista em escrita de currículos.
Sua tarefa é melhorar e reescrever o texto fornecido para que seja adequado a um currículo profissional.

Regras:
- Escreva em forma de parágrafo corrido, sem usar listas, bullets, asteriscos ou marcações.
- Mantenha tom profissional, claro e objetivo.
- Utilize palavras-chave fortes e verbos de ação.
- Corrija erros ortográficos e de gramática automaticamente.
- Melhore a fluidez e a clareza, destacando conquistas e impacto.
- NÃO inclua observações sobre correções feitas, apenas entregue o texto final revisado.

Texto a melhorar:`,
            },
          ],
        },

        contents: [{ parts: [{ text }] }],
      };

      try {
        const res: GenerateContentResponse = await sendRequest(apiKey, body);

        if (!res) return null;

        const output =
          res?.candidates?.[0]?.content?.parts?.[0]?.text ??
          res?.candidates?.[0]?.content?.parts?.find((p) => p.text)?.text ??
          "Sem resposta";

        setResult(output);
        return output;
      } catch (e: unknown) {
        const msg = (e as Error)?.message || "Erro ao processar a solicitação.";
        setError(msg);
        showToast("error", msg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiKey, showToast]
  );

  return {
    apiKey,
    setApiKey,
    loading,
    result,
    error,
    validateKey,
    improveSkills,
  };
}
