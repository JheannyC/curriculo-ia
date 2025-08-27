import express from "express";
import { perguntar } from "../services/aiService.ts";

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { mensagem } = req.body;
    if (!mensagem) {
      return res.status(400).json({ erro: "Você precisa enviar uma mensagem" });
    }

    const resposta = await perguntar(mensagem);
    res.json({ resposta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao chamar a API da OpenAI" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});
