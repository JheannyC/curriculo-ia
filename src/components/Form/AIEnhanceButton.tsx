import React, { useEffect, useState } from "react";
import { improveSkills as useAIHook } from "../../hooks/useAIEnhancement";

type Props = {
  apiKey: string;
  value: string;
  onApply: (newText: string) => void;
  context: "resumo" | "descricao";
  extraContext?: Record<string, string | undefined>;
  className?: string;
};

const AIEnhanceButton: React.FC<Props> = ({
  apiKey,
  value,
  onApply,
  context,
  extraContext,
  className,
}) => {
  const { setApiKey, improveSkills: run, loading } = useAIHook(); // fn que chama a IA
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (apiKey?.trim()) setApiKey(apiKey.trim());
  }, [apiKey, setApiKey]);

  const buildPrompt = () => {
    const checklist = `
      - Resumo Profissional: Tom profissional, incluir palavras-chave relevantes.
      - Descrições de Experiência: Use verbos de ação e quantificação (números, métricas).
      - Correções: Corrigir gramática, ortografia e melhorar a fluência.
      - Otimização: Aumentar densidade da informação e impacto sem perder clareza.
      `;

    const base =
      context === "resumo"
        ? "Melhore este resumo profissional mantendo tom conciso e claro. Use frases curtas, sem primeira pessoa."
        : "Melhore esta descrição de experiência destacando entregas, resultados e impacto. Seja específico e conciso.";

    const ctx =
      context === "descricao" &&
      extraContext &&
      Object.values(extraContext).some(Boolean)
        ? `\n\nContexto adicional:\n${Object.entries(extraContext)
            .filter(([, v]) => !!v)
            .map(([k, v]) => `- ${k}: ${v}`)
            .join("\n")}`
        : "";

    return `${base}\n${checklist}\n\nTexto original:\n${value}${ctx}`;
  };

  const handleClick = async () => {
    if (!value?.trim() || busy || loading) return;
    setBusy(true);

    const improved = await run(buildPrompt());

    if (
      improved &&
      improved.trim().toLowerCase() !== "sem resposta"
    ) {
      onApply(improved.trim());
    }
    setBusy(false);
  };

  const disabled = busy || loading || !value?.trim();

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`px-3 py-2 text-sm rounded text-white transition ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-purple-600 hover:bg-purple-700"
      } ${className ?? ""}`}
      aria-busy={busy || loading}
      title="Melhorar com IA"
    >
      {busy || loading ? "…" : "✨ Melhorar"}
    </button>
  );
};

export default AIEnhanceButton;