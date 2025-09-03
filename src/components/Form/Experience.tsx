import { useState } from "react";
import type { Experiencia } from "../../types/cv.types";

type Props = {
  onAdd: (exp: Experiencia) => void;
  experiencias: Experiencia[];
  onRemove: (index: number) => void;
};

export default function Experience({ onAdd, experiencias, onRemove }: Props) {
  const [cargo, setCargo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [inicioMes, setInicioMes] = useState("");
  const [inicioAno, setInicioAno] = useState("");
  const [fimAno, setFimAno] = useState("");
  const [fimMes, setFimMes] = useState("");
  const [atual, setAtual] = useState(false);
  const [erros, setErros] = useState<{ inicio?: string; fim?: string }>({});
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");

  const add = () => {
    const e = validaData();
    setErros(e);
    if (Object.keys(e).length) return;

    const inicio = converteSelect(inicioAno, inicioMes);
    const fim = converteSelect(fimAno, fimMes);

    const periodoTexto = atual
      ? `${formataData(inicio)} — atual`
      : `${formataData(inicio)} — ${formataData(fim)}`;

    if (!cargo || !empresa || !local || !descricao) return;
    onAdd({ cargo, empresa, periodo: periodoTexto, local, descricao });
    setCargo("");
    setEmpresa("");
    setInicioMes("");
    setFimMes("");
    setInicioAno("");
    setFimAno("");
    setAtual(false);
    setLocal("");
    setDescricao("");
  };

  const converteSelect = (ano: string, mes: string) =>
    ano && mes ? `${ano}-${mes.padStart(2, "0")}` : "";

  const mesAtual = () => new Date().toISOString().slice(0, 7);

  const converteData = (s: string) => {
    if (!/^\d{4}-\d{2}$/.test(s)) return null;
    const [y, m] = s.split("-").map(Number);
    return new Date(y, m - 1, 1);
  };

  const formataData = (s: string) => {
    const [y, m] = s.split("-");
    return new Date(Number(y), Number(m) - 1).toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });
  };

  const validaData = (): { inicio?: string; fim?: string } => {
    const e: { inicio?: string; fim?: string } = {};
    const hoje = converteData(mesAtual())!;

    const inicio = converteSelect(inicioAno, inicioMes);
    const fim = converteSelect(fimAno, fimMes);

    if (!inicio) {
      e.inicio = "Informe o mês/ano de início.";
    } else {
      const di = converteData(inicio)!;
      if (di > hoje) e.inicio = "Início não pode ser no futuro.";
    }

    if (!atual) {
      if (!fim) {
        e.fim = "Informe o mês/ano de término ou marque 'Trabalho atual'.";
      } else {
        const di = inicio ? converteData(inicio)! : null;
        const df = converteData(fim)!;

        if (df > hoje) e.fim = "Término não pode ser no futuro.";
        if (di && df < di)
          e.fim = "Término deve ser igual ou posterior ao início.";
      }
    }

    return e;
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Adicionar Experiência</h3>

      <input
        type="text"
        value={cargo}
        onChange={(e) => setCargo(e.target.value)}
        placeholder="Cargo"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="text"
        value={empresa}
        onChange={(e) => setEmpresa(e.target.value)}
        placeholder="Empresa"
        className="w-full border px-3 py-2 rounded"
      />

      <label className="block text-sm font-semibold">Período</label>

      <div className="grid grid-cols-2 gap-2">
        <select
          value={inicioMes}
          onChange={(e) => setInicioMes(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
        >
          <option value="">Mês</option>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
              {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={inicioAno}
          onChange={(e) => setInicioAno(e.target.value)}
          className="border px-2 py-1 rounded flex-1"
        >
          <option value="">Ano</option>
          {Array.from({ length: 120 }).map((_, i) => {
            const y = new Date().getFullYear() - i;
            return (
              <option key={y} value={y}>
                {y}
              </option>
            );
          })}
        </select>
      </div>

      <div className="text-center text-gray-700 font-medium my-1">até</div>

      <div className="grid grid-cols-2 gap-2 ">
        <select
          value={atual ? "atual" : fimMes}
          onChange={(e) => setFimMes(e.target.value)}
          disabled={atual}
          className={`border px-2 py-1 rounded flex-1 ${
            atual ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""
          }`}
          aria-invalid={!!erros.fim}
          aria-describedby="erro-fim"
        >
          {atual ? (
            <option value="atual">Atual</option>
          ) : (
            <>
              <option value="">Mês</option>
              {Array.from({ length: 12 }).map((_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                  {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
                </option>
              ))}
            </>
          )}
        </select>

        <select
          value={atual ? "atual" : fimAno}
          onChange={(e) => setFimAno(e.target.value)}
          disabled={atual}
          className={`border px-2 py-1 rounded flex-1 ${
            atual ? "bg-gray-200 text-gray-500 cursor-not-allowed" : ""
          }`}
          aria-invalid={!!erros.fim}
          aria-describedby="erro-fim"
        >
          {atual ? (
            <option value="atual">Atual</option>
          ) : (
            <>
              <option value="">Ano</option>
              {Array.from({ length: 50 }).map((_, i) => {
                const y = new Date().getFullYear() - i;
                return (
                  <option key={y} value={String(y)}>
                    {y}
                  </option>
                );
              })}
            </>
          )}
        </select>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <input
          id="atual"
          type="checkbox"
          checked={atual}
          onChange={(e) => setAtual(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="atual" className="text-sm">
          Trabalho Atual
        </label>
      </div>

      {erros.inicio && <p className="text-red-600 text-sm">{erros.inicio}</p>}
      {erros.fim && <p className="text-red-600 text-sm">{erros.fim}</p>}

      <input
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder="Local (ex.: Florianópolis/SC)"
        className="w-full border px-3 py-2 rounded"
      />
      <textarea
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição da experiência"
        className="w-full border px-3 py-2 rounded"
      />

      <button
        type="button"
        onClick={add}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Adicionar Experiência
      </button>

      <div className="space-y-2">
        {experiencias.map((exp, i) => (
          <div key={i} className="border p-2 rounded flex justify-between">
            <div>
              <strong>{exp.cargo}</strong> — {exp.empresa} ({exp.periodo})
              <p className="text-sm text-gray-600">{exp.descricao}</p>
            </div>
            <button
              onClick={() => onRemove(i)}
              className="text-red-600 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
