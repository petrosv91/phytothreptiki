import React from 'react';

import { useToast } from '@chakra-ui/react';
import * as yup from 'yup';

import { createToast } from '../utils';

yup.addMethod(yup.mixed, 'weightValidation', function (toast) {
  return this.test('test-weight', 'error', function (value) {
    return (
      value <= 600 ||
      createToast(toast, {
        type: 'error',
        title: 'Αποτυχία',
        content: 'Η χωρητικότητα του μηχανήματος ειναι μέχρι 600 κιλά',
      })
    );
  });
});

function useReactFormSchema() {
  const toast = useToast();

  function nullConverter(value, originalValue) {
    return String(originalValue).trim() === '' ? null : value;
  }

  const mainFormSchema = React.useMemo(() => {
    return yup.object().shape({
      date: yup.string().required(),
      type: yup.string().required(),
      recipe: yup.string().required(),
      loops: yup.number().required().positive(),
      weights: yup.number().required().positive().weightValidation(toast),
      totalWeights: yup.number().required().positive(),
      restPrice: yup.number().positive().nullable().transform(nullConverter),
    });
  }, [toast]);

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
      formula: yup.array(),
    });
  }, []);

  const productFormSchema = React.useMemo(() => {
    return yup.object().shape({
      label: yup.string().required(),
      units: yup.number().required().positive(),
      weights: yup.number().required().positive().weightValidation(toast),
    });
  }, [toast]);

  return { mainFormSchema, elementFormSchema, createElementSchema, productFormSchema };
}

export default useReactFormSchema;
