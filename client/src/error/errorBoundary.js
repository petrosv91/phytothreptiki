import React from 'react';

import ErrorPage from './errorPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log error messages to an error reporting service here
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorPage changeError={(newState) => this.setState(newState)} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
