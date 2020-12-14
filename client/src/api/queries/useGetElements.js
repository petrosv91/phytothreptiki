import { useQuery } from 'react-query';

import { baseGetService } from '../services';

async function getElements() {
  const { data } = await baseGetService({ service: 'getElements' });
  return data;
}

function useGetElements(options = {}) {
  return useQuery('elements', getElements, { ...options });
}

export default useGetElements;
