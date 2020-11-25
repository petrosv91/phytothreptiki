import { useMemo } from 'react';

import { useToast } from '@chakra-ui/react';

import { createToast } from '../utils';

function useReactQueryConfig() {
  const toast = useToast();

  const overrides = useMemo(() => {
    function handleError(e) {
      createToast(toast, { type: 'error', content: e.message, title: 'Αποτυχία' });
    }
    return {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
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
