import { createMachine } from 'xstate';

import { actions } from './formMachine.config';

export const FormMachine = createMachine({
  id: 'formMachine',
  initial: 'editting',
  context: {
    elements: [
      {
        label: 'ΦΩΣΦΩΡΙΚΟ ΚΑΛΙΟ',
        rate: '30',
        formula: [1, 2, 3],
      },
    ],
  },
  states: {
    editting: {
      on: {
        UPDATE_TABLE: { actions: [actions.updateTable, actions.callback] },
        DELETE: { actions: [actions.deleteElement] },
      },
    },
  },
});
