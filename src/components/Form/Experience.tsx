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
  const [periodo, setPeriodo] = useState(""); // por enquanto texto
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");

  const add = () => {
    if (!cargo || !empresa || !periodo || !local || !descricao) return;
    onAdd({ cargo, empresa, periodo, local, descricao });
    setCargo(""); setEmpresa(""); setPeriodo(""); setLocal(""); setDescricao("");
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
      <input
        type="text"
        value={periodo}
        onChange={(e) => setPeriodo(e.target.value)}
        placeholder="Período (ex.: 2019 — atual)"
        className="w-full border px-3 py-2 rounded"
      />
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