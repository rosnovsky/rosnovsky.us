import ErrorMessage from '../ErrorMessage';
import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import SuccessMessage from './SuccessMessage';

export const formStatus = (form) => {
  if (form.state === 'loading') {
    return <LoadingSpinner />;
  }
  return 'Subscribe';
};

export const formHasErrors = (form) => {
  if (form.state === 'error') {
    return <ErrorMessage>{form.message}</ErrorMessage>;
  } else if (form.state === 'success') {
    return <SuccessMessage>{form.message}</SuccessMessage>;
  }
};
