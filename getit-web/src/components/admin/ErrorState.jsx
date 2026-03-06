import React from 'react';

/**
 * Admin 공통 에러 UI
 */
const ErrorState = ({ message }) => (
  <div className="p-10 text-red-400 text-center">{message}</div>
);

export default ErrorState;
