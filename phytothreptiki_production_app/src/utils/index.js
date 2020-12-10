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

export function isFormEmpty(formState, { elementStore, productStore }) {
  return (
    !elementStore.length &&
    !productStore.length &&
    Object.values(formState).every((field) => field === '')
  );
}

function isRateValid({ elementStore }, { rate: newRate }) {
  const rateSum = elementStore.reduce((prev, curr) => prev + curr.rate, 0);
  return rateSum + newRate <= 100;
}
export function validateElementStore(formData, context, toast) {
  if (!isRateValid(context, formData)) {
    createToast(toast, {
      type: 'error',
      title: 'Αποτυχία',
      content: 'Το ποσοστό έχει ξεπεράσει το 100%',
    });
    return false;
  }
  return true;
}

function isTotalWeightValid({ productStore, recipe }, { weights, units }) {
  const weightsSum = productStore.reduce((prev, curr) => prev + curr.weights * curr.units, 0);
  return weightsSum + weights * units <= recipe.totalWeight;
}
export function validateProductStore(formData, context, toast) {
  if (!isTotalWeightValid(context, formData)) {
    createToast(toast, {
      type: 'error',
      title: 'Αποτυχία',
      content: 'Τα κιλά έχουν ξεπεράσει τα συνολικά κιλά που δώθηκαν',
    });
    return false;
  }
  return true;
}
