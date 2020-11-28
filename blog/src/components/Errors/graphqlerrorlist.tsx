import React from 'react';

/**
 * TODO: Expand/implement or find an exsisting type
 */
type GQLError = {
  message: string;
};

const GraphQLErrorList: React.FC<{ errors: GQLError[] }> = ({ errors }) => (
  <div>
    <h1>GraphQL Error</h1>
    {errors.map((error) => (
      <pre key={error.message}>{error.message}</pre>
    ))}
  </div>
);

export default GraphQLErrorList;
