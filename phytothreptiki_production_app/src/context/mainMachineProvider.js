import React from 'react';

import { useMachine, useService } from '@xstate/react';

import { MainMachine } from '../machines/mainMachine';
const MainMachineContext = React.createContext();

function MainMachineProvider({ children }) {
  const [, , service] = useMachine(MainMachine, { devTools: true });
  return <MainMachineContext.Provider value={service}>{children}</MainMachineContext.Provider>;
}

function useMainMachine() {
  const context = React.useContext(MainMachineContext);
  if (context === undefined) {
    throw new Error('useFormService must be used within a FormProvider');
  }
  return useService(context);
}

export { MainMachineProvider, useMainMachine };
