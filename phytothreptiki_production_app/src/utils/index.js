import React from 'react';

import { Toast } from '../layouts';

export function createToast(toast, props) {
  toast({
    position: 'bottom',
    isClosable: true,
    duration: 3000,
    render: ({ onClose }) => <Toast {...props} onClose={onClose} />,
  });
}
export function isFormEmpty(formState) {
  return Object.values(formState).every((field) => field === '');
}

function isRateValid(store, { rate }) {
  const elSum = store.reduce((acc, el) => acc + Number(el.rate), 0);
  return elSum + rate <= 100;
}
export function validateTable({ formData, store, toast }) {
  if (!isRateValid(store, formData)) {
    createToast(toast, { type: 'error', title: 'Το ποσοστό έχει ξεπεράσει το 100%' });
    return false;
  }
  return true;
}
