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
  body: unknown,
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

    const data = await response.json();

    if (!response.ok) {
      const code = data?.error?.code;
      const msg =
        code === 400 ? "Falha no envio das informações." :
        code === 401 ? "Verifique a chave de API." :
        code === 403 ? "Acesso não autorizado." :
        code === 500 ? "Problema no servidor." :
        data?.error?.message || "Erro ao validar a chave.";
      showToast("error", msg);
      return null;
    }

    showToast("success", "Autenticado com sucesso!");

    return data;

  } catch (error: any) {
    showToast("error", "Erro inesperado. Tente novamente!");
    throw error;
  }

}