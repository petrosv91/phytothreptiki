import { getCurrentDate } from '../utils';

export const formDefaultValues = {
  date: getCurrentDate(),
  type: '',
  recipe: '',
  loops: '',
  weights: '',
  restPrice: '',
  totalWeights: '',
};
