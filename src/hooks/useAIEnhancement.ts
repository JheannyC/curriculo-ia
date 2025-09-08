import { sendRequest } from "../services/aiService";
import { useCallback, useState } from "react";

export async function improveSkills(
    text: string,
    showToast?: (type: any, message: string) => void) {
    const [apiKey, setApiKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [error, setError] = useState<string | null>(null);

    const validateKey = useCallback(async (key: string) => {
    setApiKey(key);
    const payload = {
      contents: [{ parts: [{ text: "Teste de validação da API key" }] }],
    };

    const res = await sendRequest(key, payload, showToast);
    if (res) {
      showToast?.("success", "Autenticado com sucesso!");
      return true;
    }
    return false;
  }, [showToast]);
  
    try {
        const response = await fetch(`${URL}`, {
            method: "POST",
            headers: {
                "X-goog-api-key": `${userApiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: [
                        {
                            text: `Você é um especialista em desenvolvimento de currículos. 
                Sua tarefa é analisar uma lista de habilidades básicas e gerar uma versão melhorada e mais profissional delas. 
                As habilidades devem ser expressas de forma clara e impactante, adequadas para a seção de habilidades de um currículo profissional.
                Não é necessário descrever essas habilidades. Busque por habilidades que são similires as que foram listadas e adicione como 'Sugestão'.
                Se houver erro ortográfico, sugerir correção e informar que está corrigindo. 
                Aqui está a lista de habilidades: f`,
                        },
                    ],
                },
                contents: [
                    {
                        parts: [
                            {
                                text: `${text}`,
                            },
                        ],
                    },
                ],
            }),
        });

        const data = await response.json();

        if (data.error) {
            showToast(
                "error",
                `Erro: ${data.error.message || "Ocorreu um erro ao processar ação."}`
            );
        } else {
            const response =
                data.candidates?.[0]?.content?.parts?.[0]?.text ||
                data.candidates?.[0]?.text ||
                data.text ||
                "Sem resposta";
            return response;
        }
    } catch (error) {
        showToast("error", "Erro inesperado. Tente novamente!");
        console.log(error);
    }
}