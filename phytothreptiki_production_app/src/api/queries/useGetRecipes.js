import { useQuery } from 'react-query';

import { baseGetService } from '../services';

async function getRecipes() {
  const { data } = await baseGetService({ service: 'getRecipes' });
  return data;
}

function useGetRecipes(options = {}) {
  return useQuery('products', getRecipes, { ...options });
}

export default useGetRecipes;
