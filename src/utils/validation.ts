export function mapApiError(code?: number, fallback?: string) {
  switch (code) {
    case 400:
      return "Falha no envio das informações.";
    case 401:
      return "Verifique a chave de API.";
    case 403:
      return "Acesso não autorizado.";
    case 429:
      return "Limite de uso atingido. Tente mais tarde.";
    case 500:
      return "Problema no servidor.";
    default:
      return fallback || "Erro ao validar a chave.";
  }
}