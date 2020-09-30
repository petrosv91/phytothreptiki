import React from 'react';

import { Toast } from '../layouts';

export function createToast(toast, props) {
  toast({
    position: 'bottom',
    isClosable: true,
    duration: 3500,
    render: ({ onClose }) => <Toast {...props} onClose={onClose} />,
  });
}
export function isFormEmpty(formState) {
  return Object.values(formState).every((field) => field === '');
}

function isRateValid(elements, rate) {
  const elSum = elements.reduce((acc, el) => acc + Number(el.rate), 0);
  return elSum + rate <= 100;
}
export function ValidateTable({ formData, rate, elements, toast }) {
  if (!isRateValid(elements, rate)) {
    createToast(toast, { type: 'error', title: 'Το ποσοστό έχει ξεπεράσει το 100%' });
    return false;
  }
  return true;
}
