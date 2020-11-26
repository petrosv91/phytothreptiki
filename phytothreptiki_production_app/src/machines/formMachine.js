import { createMachine } from 'xstate';

import { actions } from './formMachine.config';

export const FormMachine = createMachine({
  id: 'formMachine',
  initial: 'editting',
  context: {
    element: {},
    elementStore: [],
    product: {},
    productStore: [],
  },
  states: {
    editting: {
      on: {
        ADD_ITEM: { actions: [actions.assignItem] },
        DELETE_ITEM: { actions: [actions.deleteItem, actions.callback] },
        ADD_ROW: { actions: [actions.addItemToStore, actions.callback] },
        DELETE_ROW: { actions: [actions.deleteItemFromStore] },
      },
    },
  },
});
