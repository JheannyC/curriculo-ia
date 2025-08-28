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
      }

      else if (data.error.code === 401) {
        showToast("error", "Verifique a chave de API.");
        return;
      }

      else if (data.error.code === 403) {
        showToast("error", "Acesso não autorizado.");
        return;
      }

      else if (data.error.code === 500) {
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

export const aiService = {
  sendRequest,
};
