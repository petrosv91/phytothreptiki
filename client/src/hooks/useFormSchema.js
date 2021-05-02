import React from 'react';

import { useToast } from '@chakra-ui/react';
import * as yup from 'yup';

import { useMainMachine } from '../context/mainMachineProvider';
import {
  nullConverter,
  formulaValidation,
  weightsValidation,
  formulaStandAlone,
  baseElementStandAlone,
} from '../utils/yupMethods';

yup.addMethod(yup.mixed, 'weightValidation', weightsValidation);
yup.addMethod(yup.mixed, 'formulaValidation', formulaValidation);
yup.addMethod(yup.mixed, 'formulaStandAlone', formulaStandAlone);
yup.addMethod(yup.mixed, 'baseElementStandAlone', baseElementStandAlone);

function useReactFormSchema() {
  const toast = useToast();
  const [{ context }] = useMainMachine();
  const { machineCapacity } = context;

  const mainFormSchema = React.useMemo(() => {
    return yup.object().shape({
      date: yup.string().required(),
      type: yup.string().required(),
      recipe: yup.string().required(),
      loops: yup.number().positive().nullable().transform(nullConverter),
      weights: yup
        .number()
        .positive()
        .nullable()
        .transform(nullConverter)
        .weightValidation(toast, machineCapacity),
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
