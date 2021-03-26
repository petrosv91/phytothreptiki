import { useMemo } from 'react';

import { useToast } from '@chakra-ui/react';

import { createToast } from '../utils';

function useReactQueryConfig() {
  const toast = useToast();

  const overrides = useMemo(() => {
    function handleError(e) {
      createToast(toast, { type: 'error', title: 'Αποτυχία', content: e.message });
    }
    return {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        onError: handleError,
      },
      mutations: {
        onError: handleError,
      },
    };
  }, [toast]);
  return overrides;
}

export default useReactQueryConfig;
