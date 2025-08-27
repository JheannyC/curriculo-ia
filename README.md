# Geração de currículo com IA

Este projeto tem como objetivo criar um formulário para o usuário preencher com seus dados e gerar um currículo personalizado com o auxílio da Inteligência Artificial.

## Tecnologias utilizadas

- React
- TypeScript
- TailwindCSS
- OpenAI API
- Node.js
- npm
- Vite

Requisitos para executar o projeto
- Node.js (latest)
- npm (latest)
---
Após clonar o projeto, na raiz, executar o comando:
```bash
npm install
```
Após instalar as dependências, executar o comando:
```bash
npm run dev
```
---
Executando o backend
Na pasta raiz do projeto, executar o comando:
```bash
npm run back
```

A API estará disponível em `http://localhost:3000`
Para autenticar é necessário passar o token da API no header da requisição.
```
Authorization: Bearer <apiToken>
```

Para enviar uma mensagem para a API, faça uma requisição POST para `http://localhost:3000/chat` com o seguinte corpo:
```json
{
  "mensagem": "Olá, como está?"
}
```
A resposta da API será um JSON contendo a mensagem respondida pela IA.
```json
{
  "resposta": "Olá! Estou bem, obrigado por perguntar."
}
```
