import React from 'react';

import { Toast } from '../layouts';

export function createToast(toast, props) {
  toast.closeAll();
  toast({
    position: 'bottom',
    isClosable: true,
    duration: 4000,
    render: ({ onClose }) => <Toast {...props} onClose={onClose} />,
  });
}

export function convertEmptyFields(formData) {
  return Object.entries(formData).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value || 0 }),
    {},
  );
}

export function isFormEmpty(formState, { elementStore, productStore }) {
  return (
    !elementStore.length &&
    !productStore.length &&
    Object.values(formState).every((field) => field === '')
  );
}
export function isFormFull(formState, { elementStore, productStore }) {
  return (
    elementStore.length &&
    productStore.length &&
    Object.values(formState).every((field) => field !== '')
  );
}

export function isRateValid({ elementStore }, { rate: newRate }) {
  const rateSum = elementStore.reduce((prev, curr) => prev + curr.rate, 0);
  return rateSum + newRate <= 100;
}
export function isTotalWeightValid({ productStore }, { weights, units }, totalWeight) {
  const weightsSum = productStore.reduce((prev, curr) => prev + curr.weights * curr.units, 0);
  return weightsSum + weights * units <= totalWeight;
}

export function roundToTwo(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

export function getCurrentDate() {
  const dateObj = new Date();
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}
