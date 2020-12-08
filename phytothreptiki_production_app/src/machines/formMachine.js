import { createMachine } from 'xstate';

import { initialContext, actions, services } from './formMachine.config';

export const FormMachine = createMachine({
  id: 'formMachine',
  initial: 'editting',
  context: {
    ...initialContext,
  },
  states: {
    editting: {
      on: {
        ADD_RECIPE: { actions: [actions.updateContext] },
        DELETE_RECIPE: { actions: [actions.resetContext] },
        ADD_ITEM: { actions: [actions.assignItem] },
        DELETE_ITEM: { actions: [actions.deleteItem, actions.callback] },
        ADD_ROW: { actions: [actions.addItemToStore, actions.callback] },
        DELETE_ROW: { actions: [actions.deleteItemFromStore] },
        SUBMIT: {
          target: 'submitting',
        },
      },
    },
    submitting: {
      invoke: {
        src: services.setRecipe,
        onDone: {
          target: 'editting',
          actions: [actions.renderSuccess, actions.resetContext, actions.callback],
        },
        onError: {
          target: 'editting',
          actions: [actions.renderError],
        },
      },
    },
  },
});
