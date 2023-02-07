import { useMemo } from 'react';

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

const requiredMsg = 'Yποχρεωτικό πεδίο';
const positiveMsg = 'Μόνο θετικοί αριθμοί';

function useReactFormSchema() {
  const toast = useToast();
  const [{ context }] = useMainMachine();
  const { machineCapacity } = context;

  const mainFormSchema = useMemo(() => {
    return yup.object().shape({
      date: yup.string().required(requiredMsg),
      type: yup.string().required(requiredMsg),
      recipe: yup.string().required(requiredMsg),
      loops: yup.number().positive(positiveMsg).nullable().transform(nullConverter),
      weights: yup
        .number()
        .positive(positiveMsg)
        .nullable()
        .transform(nullConverter)
        .weightValidation(toast, machineCapacity),
      totalWeights: yup.number().required(requiredMsg).positive(positiveMsg),
      restPrice: yup.number().positive(positiveMsg).nullable().transform(nullConverter),
    });
  }, [toast, machineCapacity]);

  const elementFormSchema = useMemo(() => {
    return yup.object().shape({
      label: yup.string().required(requiredMsg),
      rate: yup.number().required(requiredMsg).positive(positiveMsg),
      price: yup.number().positive(positiveMsg).nullable().transform(nullConverter),
    });
  }, []);

  const createElementSchema = useMemo(() => {
    return yup.object().shape({
      label: yup.string().required(requiredMsg),
      price: yup.number().positive(positiveMsg).nullable().transform(nullConverter),
      formula: yup.array().formulaValidation(toast).formulaStandAlone(toast),
      baseElement: yup.object().baseElementStandAlone(toast),
    });
  }, [toast]);

  const productFormSchema = useMemo(() => {
    return yup.object().shape({
      label: yup.string().required(requiredMsg),
      units: yup.number().required(requiredMsg).positive(positiveMsg),
      weights: yup
        .number()
        .required(requiredMsg)
        .positive(positiveMsg)
        .weightValidation(toast, machineCapacity),
    });
  }, [toast, machineCapacity]);

  return { mainFormSchema, elementFormSchema, createElementSchema, productFormSchema };
}

export default useReactFormSchema;
