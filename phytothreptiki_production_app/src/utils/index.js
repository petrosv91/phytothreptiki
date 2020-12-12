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
export function isRateValid({ elementStore }, { rate: newRate }) {
  const rateSum = elementStore.reduce((prev, curr) => prev + curr.rate, 0);
  return rateSum + newRate <= 100;
}
export function isTotalWeightValid({ productStore }, { weights, units }, totalWeight) {
  const weightsSum = productStore.reduce((prev, curr) => prev + curr.weights * curr.units, 0);
  return weightsSum + weights * units <= totalWeight;
}
