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

### Requisitos para executar o projeto
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
<br>

## Serviço de autenticação - Utilizando chave de API do Gemini

Para executar a aplicação é necessário ter uma chave do Gemini para realizar requisições para a IA.

- Acessar: https://aistudio.google.com/apikey
- Logar com uma conta do google
- Clicar em 'Get API Key' (Build with the Gemini API)
- Aceitar os termos
- Clicar em 'Criar chave da API'
- Copiar a chave para utilizar na aplicação

No arquivo `aiService.ts`, existe uma função que é necessário passar a key gerada para realizar a autenticação. A depender do retorno da requisição, a função irá exibir um toast com a mensagem de sucesso ou erro.
```
aiService.sendRequest(`${API_KEY}`, showToast);
```

Para utilizar o serviço de melhorar a seção de habilidades do currículo, depois de autenticado o sistema deve identificar que o usuário está logado e basta utilizar o serviço passando a lista de habilidades como parâmetro.
```
aiService.improveSkills(text)
```