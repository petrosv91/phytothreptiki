import React from 'react';

import { useToast } from '@chakra-ui/react';
import * as yup from 'yup';

import { useMainMachine } from '../context/mainMachineProvider';
import { createToast, isObjEmpty } from '../utils';

yup.addMethod(yup.mixed, 'weightValidation', function (toast, machineCapacity) {
  return this.test('test-weight', 'error', function (value) {
    return (
      value <= machineCapacity ||
      createToast(toast, {
        type: 'error',
        title: 'Αποτυχία',
        content: `Η χωρητικότητα του μηχανήματος ειναι μέχρι ${machineCapacity} κιλά`,
      })
    );
  });
});
yup.addMethod(yup.mixed, 'formulaStandAlone', function (toast) {
  return this.test('test-standAlone', 'error', function (formula) {
    if (formula.length && !isObjEmpty(this.parent.baseElement)) return true;
    if (!formula.length && isObjEmpty(this.parent.baseElement)) return true;
    return createToast(toast, {
      type: 'error',
      title: 'Αποτυχία',
      content: 'Τα πεδία "Στοιχεία" και "Βασικό Στοιχείο" πρέπει να είναι ή γεμάτα ή άδεια',
    });
  });
});
yup.addMethod(yup.mixed, 'baseElementStandAlone', function (toast) {
  return this.test('test-standAlone', 'error', function (baseElement) {
    if (this.parent.formula.length && !isObjEmpty(baseElement)) return true;
    if (!this.parent.formula.length && isObjEmpty(baseElement)) return true;
    return createToast(toast, {
      type: 'error',
      title: 'Αποτυχία',
      content: 'Τα πεδία "Στοιχεία" και "Βασικό Στοιχείο" πρέπει να είναι ή γεμάτα ή άδεια',
    });
  });
});
yup.addMethod(yup.mixed, 'formulaValidation', function (toast) {
  return this.test('test-formula', 'error', function (formula) {
    if (!formula.length || formula.length >= 3) return true;
    return createToast(toast, {
      type: 'error',
      title: 'Αποτυχία',
      content: 'Το πεδίο "Στοιχεία" πρέπει να είναι της μορφής 0-0-0',
    });
  });
});

function useReactFormSchema() {
  const toast = useToast();
  const [state] = useMainMachine();
  const { machineCapacity } = state.context;

  function nullConverter(value, originalValue) {
    return String(originalValue).trim() === '' ? null : value;
  }

  const mainFormSchema = React.useMemo(() => {
    return yup.object().shape({
      date: yup.string().required(),
      type: yup.string().required(),
      recipe: yup.string().required(),
      loops: yup.number().required().positive(),
      weights: yup.number().required().positive().weightValidation(toast, machineCapacity),
      totalWeights: yup.number().required().positive(),
      restPrice: yup.number().positive().nullable().transform(nullConverter),
    });
  }, [toast, machineCapacity]);

  const elementFormSchema = React.useMemo(() => {
    return yup.object().shape({
      label: yup.string().required(),
      rate: yup.number().required().positive(),
      price: yup.number().positive().nullable().transform(nullConverter),
    });
  }, []);
  const createElementSchema = React.useMemo(() => {
    return yup.object().shape({
      label: yup.string().required(),
      price: yup.number().positive().nullable().transform(nullConverter),
      formula: yup.array().formulaValidation(toast).formulaStandAlone(toast),
      baseElement: yup.object().baseElementStandAlone(toast),
    });
  }, [toast]);

  const productFormSchema = React.useMemo(() => {
    return yup.object().shape({
      label: yup.string().required(),
      units: yup.number().required().positive(),
      weights: yup.number().required().positive().weightValidation(toast, machineCapacity),
    });
  }, [toast, machineCapacity]);

  return { mainFormSchema, elementFormSchema, createElementSchema, productFormSchema };
}

export default useReactFormSchema;
