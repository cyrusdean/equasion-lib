import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    // console.log('this.props', this.props);
    // Display fallback UI
    this.setState({ hasError: true });
    // TODO: Log to error logging service instead of console.
    // logErrorToService(error, info);

    // eslint-disable-next-line
    console.log('ERROR: ', error);
    // eslint-disable-next-line
    console.log('ERROR INFO: ', info);
  }

  render() {
    const { children } = this.props;

    if (!children) {
      return <div />;
    }
    return children;
  }
}
