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

  const mainFormSchema = React.useMemo(() => {
    return yup.object().shape({
      date: yup.string().required(),
      type: yup.string().required(),
      recipe: yup.string().required(),
      loops: yup.number().required().positive(),
      weights: yup.number().required().positive().weightValidation(toast),
      totalWeight: yup.number().required().positive(),
    });
  }, [toast]);

  const elementFormSchema = React.useMemo(() => {
    return yup.object().shape({
      rate: yup.number().required().positive(),
      price: yup.number().positive(),
      restPrice: yup.number().positive(),
    });
  }, []);

  const productFormSchema = React.useMemo(() => {
    return yup.object().shape({
      weights: yup.number().required().positive().weightValidation(toast),
      units: yup.number().positive(),
    });
  }, [toast]);

  return { mainFormSchema, elementFormSchema, productFormSchema };
}

export default useReactFormSchema;
