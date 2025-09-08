const URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
let userApiKey = "";

const payload = {
  contents: [
    {
      parts: [{ text: "Teste de validação da API key" }],
    },
  ],
};

export async function sendRequest(
  apiKey: string,
  showToast: (type: any, message: string) => void) {
  userApiKey = apiKey;
  try {
    const response = await fetch(`${URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "X-goog-api-key": `${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json();

      if (data.error.code === 400) {
        showToast("error", "Falha no envio das informações.");
        return;
      } else if (data.error.code === 401) {
        showToast("error", "Verifique a chave de API.");
        return;
      } else if (data.error.code === 403) {
        showToast("error", "Acesso não autorizado.");
        return;
      } else if (data.error.code === 500) {
        showToast("error", "Problema no servidor.");
        return;
      }
    }

    showToast("success", "Autenticado com sucesso!");
    return await response.json();
  } catch (error: any) {
    showToast("error", "Erro inesperado. Tente novamente!");
    throw error;
  }
}

export async function improveSkills(
  text: string,
  showToast: (type: any, message: string) => void) {
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

export const aiService = {
  sendRequest,
  improveSkills,
};
