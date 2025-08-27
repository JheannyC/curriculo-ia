import "./App.css";
import "../src/components/UI/Toast";
import { useToast } from "../src/hooks/useToast";
import Toast from "../src/components/UI/Toast";

function App() {

  const { showToast, toast, removeToast } = useToast();

  return (
    <>
      <div className="card flex ...">
        <div className="flex-1 ...">Currículo com IA</div>
      </div>
      
      <div className="card flex ...">
        <div className="flex-1 ... ">
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
      </div>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          duration={3000}
          onClose={removeToast}
        />
      )}
    </>
  );
}

export default App;
