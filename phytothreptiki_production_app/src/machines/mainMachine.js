import { createMachine } from 'xstate';

import { initialContext, actions, services } from './mainMachine.config';

export const MainMachine = createMachine({
  id: 'mainMachine',
  initial: 'editting',
  context: {
    ...initialContext,
  },
  states: {
    editting: {
      on: {
        ADD_RECIPE: { actions: [actions.updateContext] },
        DELETE_RECIPE: { actions: [actions.resetContext, actions.callback] },
        ADD_ITEM: { actions: [actions.assignItem] },
        DELETE_ITEM: { actions: [actions.deleteItem, actions.callback] },
        ADD_ROW: { actions: [actions.addItemToStore, actions.callback] },
        DELETE_ROW: { actions: [actions.deleteItemFromStore] },
        RECIPE_SUBMIT: {
          target: 'recipeSubmitting',
        },
        ELEMENT_SUBMIT: {
          target: 'elementSubmitting',
        },
        PRODUCT_SUBMIT: {
          target: 'elementSubmitting',
        },
      },
    },
    elementSubmitting: {
      invoke: {
        src: services.setElement,
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
    productSubmitting: {
      invoke: {
        src: services.setProduct,
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
    recipeSubmitting: {
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
