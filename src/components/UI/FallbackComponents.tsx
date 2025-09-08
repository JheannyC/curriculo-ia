import React from 'react';

interface FallbackProps {
  message?: string;
  onRetry?: () => void;
  context?: string;
}

export const NetworkFallback: React.FC<FallbackProps> = ({ onRetry, message = "Problema de conexão" }) => (
  <div className="network-fallback">
    <div className="fallback-content">
      <div className="icon">📡</div>
      <h4>{message}</h4>
      <p>Verifique sua conexão e tente novamente.</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-retry">
          Tentar novamente
        </button>
      )}
    </div>
  </div>
);

export const ComponentFallback: React.FC<FallbackProps> = ({ message = "Componente indisponível", context }) => (
  <div className="component-fallback">
    <div className="fallback-content">
      <div className="icon">⚙️</div>
      <h4>{message}</h4>
      {context && <p>{context}</p>}
      <small>Tente recarregar a página.</small>
    </div>
  </div>
);

export const LoadingFallback: React.FC<{ message?: string }> = ({ message = "Carregando..." }) => (
  <div className="loading-fallback">
    <div className="spinner"></div>
    <p>{message}</p>
  </div>
);