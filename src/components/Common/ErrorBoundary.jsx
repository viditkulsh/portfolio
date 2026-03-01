import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portfolio Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary-dark flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-text mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-primary-text/70 mb-6">
              Don't worry, even the best developers encounter bugs sometimes! 🐛
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
