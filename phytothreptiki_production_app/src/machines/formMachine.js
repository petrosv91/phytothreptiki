import { createMachine } from 'xstate';

import { actions } from './formMachine.config';

export const FormMachine = createMachine({
  id: 'formMachine',
  initial: 'editting',
  context: {
    store: [],
  },
  states: {
    editting: {
      on: {
        ADD: { actions: [actions.addItemToStore, actions.callback] },
        DELETE: { actions: [actions.deleteItemFromStore] },
      },
    },
  },
});
