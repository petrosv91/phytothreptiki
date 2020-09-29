import { createMachine } from 'xstate';

import { actions, guards, services } from './formMachine.config';

export const FormMachine = createMachine({
  id: 'formMachine',
  initial: 'editting',
  context: {
    elements: [],
  },
  states: {
    editting: {
      on: {
        UPDATE_TABLE: { actions: [actions.updateTable, actions.callback] },
      },
    },
  },
});
