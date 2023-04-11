import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    if (process.env.NODE_ENV === 'development') {
      console.log({ error, errorInfo });
    }
  }

  render() {
    // Check if the error is thrown
    const { hasError } = this.state;
    const { fallback, children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return fallback;
    }

    // Return children components in case of no error
    return children;
  }
}

export default ErrorBoundary;
