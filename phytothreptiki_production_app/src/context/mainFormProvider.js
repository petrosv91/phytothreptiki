import React from 'react';

import { useMachine, useService } from '@xstate/react';

import { FormMachine } from '../machines/formMachine';
const MainFormContext = React.createContext();

function MainFormProvider({ children }) {
  const [, , service] = useMachine(FormMachine, { devTools: true });
  return <MainFormContext.Provider value={service}>{children}</MainFormContext.Provider>;
}

function useMainFormService() {
  const context = React.useContext(MainFormContext);
  if (context === undefined) {
    throw new Error('useFormService must be used within a FormProvider');
  }
  return useService(context);
}

export { MainFormProvider, useMainFormService };
