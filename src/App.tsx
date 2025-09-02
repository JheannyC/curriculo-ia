import React, { useState } from 'react';
import { useToast } from './hooks/useToast';
import Toast from './components/UI/Toast';
import { useCVData } from './hooks/useCVData';
import FormSection from './components/Layout/FormSection';
import PreviewSection from './components/Layout/PreviewSection';
import ErrorBoundary from './components/UI/ErrorBoundary';

function App() {
  const { showToast, toast, removeToast } = useToast();
  const cvData = useCVData();
  const [API_KEY, setAPI_KEY] = useState('');
  const [isTestingAPI, setIsTestingAPI] = useState(false);

  const handleTestAPI = async () => {
    if (!API_KEY.trim()) {
      showToast('error', 'Por favor, insira uma API Key válida');
      return;
    }

    setIsTestingAPI(true);
    try {
      // Simulação de teste de API - será substituído pelo aiService real
      await new Promise(resolve => setTimeout(resolve, 1500));
      showToast('success', 'API conectada com sucesso!');
    } catch (error) {
      showToast('error', 'Falha ao conectar com a API');
    } finally {
      setIsTestingAPI(false);
    }
  };

  const handleExportPDF = () => {
    showToast('info', 'Exportação para PDF em desenvolvimento');
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CV</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Gerador de Currículos IA
                </h1>
                <p className="text-sm text-gray-500">
                  Crie currículos profissionais com inteligência artificial
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* API Key Input */}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="password"
                    value={API_KEY}
                    onChange={(e) => setAPI_KEY(e.target.value)}
                    placeholder="Cole sua API Key"
                    className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    aria-label="Chave da API"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-400">🔑</span>
                  </div>
                </div>
                
                <button
                  onClick={handleTestAPI}
                  disabled={!API_KEY.trim() || isTestingAPI}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isTestingAPI ? 'Testando...' : 'Testar API'}
                </button>
              </div>

              <button
                onClick={handleExportPDF}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              >
                Exportar PDF
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          <FormSection
            cvData={cvData}
            onAIEnhance={() => showToast('info', 'Otimização com IA em desenvolvimento')}
            aiLoading={false}
          />
          
          <PreviewSection cvData={cvData.cvData} />
        </main>

        {/* Toast System */}
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            duration={3000}
            onClose={removeToast}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;