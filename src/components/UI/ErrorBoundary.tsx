import { Component, 
  type ErrorInfo, 
  type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onRetry?: () => void;
  context?: string;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo, this.props.componentName);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onRetry?.();
  };

  private handleReset = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || this.renderDefaultFallback();
    }

    return this.props.children;
  }

  private renderDefaultFallback() {
    const { context, componentName } = this.props;

    return (
      <div className="error-boundary">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h3>Algo deu errado</h3>
          <p>Desculpe, encontramos um problema inesperado.</p>
          
          {(context || componentName) && (
            <p className="error-context">
              {context && `Seção: ${context}`}
              {componentName && `Componente: ${componentName}`}
            </p>
          )}

          <div className="error-actions">
            <button onClick={this.handleRetry} className="btn-retry">
              ↻ Tentar novamente
            </button>
            <button onClick={this.handleReset} className="btn-reset">
              ⟳ Recarregar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;