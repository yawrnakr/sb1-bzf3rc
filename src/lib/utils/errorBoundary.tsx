import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorMessage from '../../components/ErrorMessage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <ErrorMessage message="Something went wrong. Please try again later." />
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}