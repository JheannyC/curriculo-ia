import OpenAI from "openai";

let client = new OpenAI({
  apiKey: "",
});

const OPENAI_URL = "https://api.openai.com/v1";

export async function perguntar(message: string): Promise<string> {
  const response = await fetch(`${OPENAI_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${client.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      mensagem: message,
    }),
  });

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

