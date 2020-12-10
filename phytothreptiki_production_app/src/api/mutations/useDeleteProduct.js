import { useMutation } from 'react-query';

import { baseGetService } from '../services';

async function deleteProduct({ id }) {
  return await baseGetService({ service: 'deleteProduct', id });
}

function useDeleteProduct(options = {}) {
  return useMutation(deleteProduct, { ...options });
}

export default useDeleteProduct;
