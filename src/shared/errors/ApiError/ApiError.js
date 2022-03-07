import React from 'react';
import './ApiError.scss';

const ApiError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((e, i) => (
      <div className="api-error" key={String(i)}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {e.message.replace('GraphQL error: ', '')}
        </p>
      </div>
    ));
  }
  return (
    <div className="api-error">
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </div>
  );
};

export default ApiError;
