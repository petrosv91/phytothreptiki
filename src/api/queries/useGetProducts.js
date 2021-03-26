import { useQuery } from 'react-query';

import { baseGetService } from '../services';

async function getProducts() {
  const { data } = await baseGetService({ service: 'getProducts' });
  return data;
}

function useGetProducts(options = {}) {
  return useQuery('products', getProducts, { ...options });
}

export default useGetProducts;
