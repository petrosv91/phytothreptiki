import { useMutation } from 'react-query';

import { baseGetService } from '../services';

async function deleteElement(id) {
  return await baseGetService({ service: 'deleteElement', id });
}

function useDeleteElements(options = {}) {
  return useMutation(deleteElement, { ...options });
}

export default useDeleteElements;
