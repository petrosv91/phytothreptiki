import { useMutation } from 'react-query';

import { baseGetService } from '../services';

async function deleteRecipe({ id }) {
  return await baseGetService({ service: 'deleteRecipe', id });
}

function useDeleteRecipe(options = {}) {
  return useMutation(deleteRecipe, { ...options });
}

export default useDeleteRecipe;
