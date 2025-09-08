import type { GenerateContentRequest, GenerateContentResponse } from "../types/api.types";
import { sendRequest } from "../services/aiService";
import { useCallback, useState } from "react";
import { useToast } from "./useToast";

export function improveSkills() {
    const { showToast } = useToast();
    const [apiKey, setApiKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [error, setError] = useState<string | null>(null);

    const validateKey = useCallback(async (key: string) => {
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
    }, [showToast]);

    const improveSkills = useCallback(async (text: string) => {
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
                        text: `Você é um especialista em desenvolvimento de currículos. 
                Sua tarefa é analisar uma lista de habilidades básicas e gerar uma versão melhorada e mais profissional delas. 
                As habilidades devem ser expressas de forma clara e impactante, adequadas para a seção de habilidades de um currículo profissional.
                Não é necessário descrever essas habilidades. Busque por habilidades que são similires as que foram listadas e adicione como 'Sugestão'.
                Se houver erro ortográfico, sugerir correção e informar que está corrigindo.`,
                    },
                ],
            },

            contents: [{ parts: [{ text }] }],

        };

        try {
            const res = await sendRequest(apiKey, body);

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
    }, [apiKey, showToast]);

    return { apiKey, setApiKey, loading, result, error, validateKey, improveSkills };

}