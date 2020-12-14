import React from 'react';

import { useToast } from '@chakra-ui/react';
import { useMachine, useService } from '@xstate/react';

import { MainMachine } from '../machines/mainMachine';
import { createToast } from '../utils';

const MainMachineContext = React.createContext();

function MainMachineProvider({ children }) {
  const toast = useToast();
  const [, , service] = useMachine(MainMachine, {
    devTools: true,
    actions: {
      renderSuccess: (ctx, e) => {
        createToast(toast, { type: 'success', title: 'Επιτυχής καταχώρηση' });
      },
      renderError: (ctx, e) => {
        const { message } = e.data;
        createToast(toast, { type: 'error', title: 'Αποτυχία', content: message });
      },
    },
  });
  return <MainMachineContext.Provider value={service}>{children}</MainMachineContext.Provider>;
}

function useMainMachine() {
  const context = React.useContext(MainMachineContext);
  if (context === undefined) {
    throw new Error('useMainMachine must be used within a MainMachineProvider');
  }
  return useService(context);
}

export { MainMachineProvider, useMainMachine };
