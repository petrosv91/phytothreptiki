import { useQuery } from 'react-query';

import { baseGetService } from '../services';

async function getProductionFile() {
  const { data } = await baseGetService({ service: 'getProductionFile' });
  return data;
}

function useGetProductionFile(options = {}) {
  return useQuery('productionFile', getProductionFile, { ...options });
}

export default useGetProductionFile;
