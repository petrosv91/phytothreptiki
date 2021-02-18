import { useMutation } from 'react-query';

import { baseGetService } from '../services';

async function deleteProductionFile({ id }) {
  return await baseGetService({ service: 'deleteProductionFile', id });
}

function useDeleteProductionFile(options = {}) {
  return useMutation(deleteProductionFile, { ...options });
}

export default useDeleteProductionFile;
