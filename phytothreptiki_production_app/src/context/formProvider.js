import React from 'react';

import { useMachine, useService } from '@xstate/react';

import { FormMachine } from '../machines/formMachine';
const FormContext = React.createContext();

function FormProvider({ children }) {
  const [, , service] = useMachine(FormMachine, { devTools: true });
  return <FormContext.Provider value={service}>{children}</FormContext.Provider>;
}

function useFormService() {
  const context = React.useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormService must be used within a FormProvider');
  }
  return useService(context);
}

export { FormProvider, useFormService };
