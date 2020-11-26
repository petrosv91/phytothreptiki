import * as yup from 'yup';

export const subFormSchema = yup.object().shape({
  rate: yup.number().required().typeError('Υποχρεωτικό Πεδίο').positive('Μόνο θετικοί αριθμοί'),
  price: yup.number().typeError('Υποχρεωτικό Πεδίο').positive('Μόνο θετικοί αριθμοί'),
  restPrice: yup.number().typeError('Υποχρεωτικό Πεδίο').positive('Μόνο θετικοί αριθμοί'),
});

export const mainFormSchema = yup.object().shape({
  date: yup.number().required().positive(),
  type: yup.string().required(),
  recipe: yup.number().required().positive(),
  loops: yup.number().required().positive(),
  weight: yup.string().required(),
  totalWeight: yup.number().required().positive(),
});
