import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false });
    this.props.onReset?.();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
          <div className="max-w-md">
            <h1 className="text-3xl font-black text-slate-900 mb-4">Algo ha fallado</h1>
            <p className="text-slate-600 font-medium mb-8">
              Ha ocurrido un error inesperado. Por favor, vuelve al inicio e inténtalo de nuevo.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="bg-[#0a2e5c] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase shadow-xl hover:bg-[#0d4285] transition-all"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
