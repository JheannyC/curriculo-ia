import "./App.css";
import { useToast } from "../src/hooks/useToast";
import Toast from "../src/components/UI/Toast";
import { aiService } from "../src/services/aiService";
import { useState } from "react";


function App() {

  const [nome, setNome] = useState<string>("");

  // Campos da experiência
  const [cargo, setCargo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [atual, setAtual] = useState(false);

  // Lista de experiências
  const [experiencias, setExperiencias] = useState<
    { cargo: string; empresa: string; periodo: string; local:string; descricao: string }[]
  >([]);

  // Adicionar experiência
  const addExperiencia = () => {

    if (!cargo || !empresa || !periodo || !local || !descricao) {
      showToast("error", "Por favor, preencha todos os campos da experiência.");  
      return;
    } // evita item vazio

    const periodoFinal = atual ? `${periodo} - Atual` : periodo;

    const nova = { cargo, empresa, periodo: periodoFinal, local, descricao };

    setExperiencias(prev => [...prev, nova]);

    setCargo("");
    setEmpresa("");
    setPeriodo("");
    setLocal("");
    setDescricao("");
    setAtual(false);
  };

  // Remover experiência
  const removeExperiencia = (index: number) => {
    setExperiencias(prev => prev.filter((_, i) => i !== index));
  };

  const { showToast, toast, removeToast } = useToast();
  const API_KEY = '';

  return (
    
    <div className="h-dvh flex flex-col">

      <header className="flex items-center justify-between px-4 py-3 bg-white border-b">
        <div className="flex items-center gap-3">
          <span className="logo" aria-hidden="true"></span>
          <div>
            <strong>Gerador de Currículos IA</strong>
            <div className="subtitle text-sm text-gray-500">
              Gerador Inteligente de Currículos com IA
            </div>
          </div>
        </div>

        <div className="actions flex items-center gap-2">
          <label className="api-key flex items-center gap-2 border rounded px-2 py-1">
            <span>🔐</span>
            <input
              type="text"
              placeholder="Cole sua API Key"
              aria-label="API Key"
              className="outline-none"
            />
          </label>

          <button className="btn border rounded px-3 py-2" id="btnExport">
            Exportar PDF
          </button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 min-h-0">
        <section className="bg-white border rounded-xl shadow p-6 h-full min-h-0 overflow-y-auto">
          <h2 className="font-bold text-lg px-5 pt-5 border-b">Informações do Currículo</h2>

          <div className="px-5 py-4 space-y-3 pr-3 scroll-area">
            <label className="block text-sm font-semibold">Nome Completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <h3 className="font-semibold mt-4 mb-2">Adicionar Experiência</h3>

          <input
            type="text"
            value={cargo}
            onChange={(e) => setCargo(e.target.value)}
            placeholder="Cargo"
            className="w-full border px-3 py-2 mb-2 rounded"
          />

          <input
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Empresa"
            className="w-full border px-3 py-2 mb-2 rounded"
          />

          <input
            type="text"
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            placeholder="Período"
            className="w-full border px-3 py-2 mb-2 rounded"
          />

          <div className="flex items-center gap-2 mb-2">
            <input
              id="atual"
              type="checkbox"
              checked={atual}
              onChange={(e) => setAtual(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="atual" className="text-sm">Trabalho Atual</label>
          </div>

          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            placeholder="Local (ex.: Florianópolis/SC)"
            className="w-full border px-3 py-2 mb-2 rounded"
          />

          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descrição da experiência"
            className="w-full border px-3 py-2 mb-2 rounded"
          ></textarea>

          <button
            type="button"
            onClick={addExperiencia}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Adicionar Experiência
          </button>

          <div className="mt-4 space-y-2">

            {experiencias.map((exp, i) => (
              <div key={i} className="border p-2 rounded flex justify-between">

                <div>
                  <strong>{exp.cargo}</strong> – {exp.empresa} ({exp.periodo})
                  <p className="text-sm text-gray-600">{exp.descricao}</p>
                </div>

                <button
                  onClick={() => removeExperiencia(i)}
                  className="text-red-600 font-bold"
                >
                  ×
                </button>

              </div>
            ))}
          </div>
        </section>

        <aside className="bg-white border rounded-xl shadow p-6 h-full min-h-0 overflow-y-auto">

          <h2 className="text-2xl font-extrabold mb-1">
            {nome || "Seu Nome Completo"}
          </h2>

          <div className="h-[2px] bg-black my-4" />

          <div className="overflow-y-auto px-6 pb-6 pr-4 space-y-4 scroll-area">
            <h3 className="text-lg font-bold">Experiência Profissional</h3>

            {experiencias.length === 0 ? (
              <p className="text-gray-500 italic">
                Suas experiências aparecerão aqui conforme você adiciona…
              </p>
            ) : (
              <ul className="space-y-4">
                {experiencias.map((exp, i) => (
                  <li key={i} className="border border-gray-200 rounded-lg p-4">
                    <div className="text-base font-semibold">{exp.cargo}</div>
                    <div className="text-sm text-gray-600">
                      {exp.empresa} • {exp.periodo} • {exp.local}
                    </div>
                    {exp.descricao && (
                      <p className="text-sm mt-2 leading-relaxed">{exp.descricao}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </main>

      <div className="bg-white border rounded-xl shadow p-4 flex">
        <div className="flex-1">Currículo com IA</div>
      </div>

      <div className="bg-white border rounded-xl shadow p-4 flex items-start justify-between gap-3">
        <div className="flex-1">
          <button
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => showToast("success", "Enviado com sucesso!")}
          >
            Toast de sucesso
          </button>
          <button
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => showToast("error", "Mensagem de erro!")}
          >
            Toast de erro
          </button>
          <button
            className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => showToast("warning", "Mensagem de aviso!")}
          >
            Toast de aviso
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => showToast("info", "Mensagem de informação!")}
          >
            Toast de informação
          </button>
        </div>

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            aiService.sendRequest(`${API_KEY}`, showToast);
          }}
        >
          Teste de API
        </button>
      </div>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          duration={3000}
          onClose={removeToast}
        />
      )}
    </div>
  );
}

export default App;