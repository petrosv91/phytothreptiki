import React from 'react';

import { Toast } from '../layouts';

export function createToast(toast, props) {
  toast.closeAll();
  toast({
    position: 'bottom',
    isClosable: true,
    duration: 4000,
    render: ({ onClose }) => <Toast onClose={onClose} {...props} />,
  });
}

export function convertStringToArrayOfNumbers(value, delimiter) {
  if (!value || value === '') return [];
  return value.split(delimiter).map((el) => Number(el));
}
export function isObjEmpty(obj) {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) return false;
  }
  return true;
}

export function convertEmptyFields(formData, defaultValue) {
  return Object.entries(formData).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value || defaultValue }),
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
export function istotalWeightsValid({ productStore }, { weights, units }, totalWeights) {
  const weightsSum = productStore.reduce((prev, curr) => prev + curr.weights * curr.units, 0);
  return weightsSum + weights * units <= totalWeights;
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

export function findDelimiter(dateFormat) {
  return dateFormat.split('').find((c) => c === '.' || c === '/' || c === '/');
}
