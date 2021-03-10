import { createMachine } from 'xstate';

import { initialContext, actions, services, guards } from './mainMachine.config';

export const MainMachine = createMachine({
  id: 'mainMachine',
  initial: 'gettingMaxCode',
  context: {
    ...initialContext,
  },
  states: {
    editting: {
      on: {
        ADD_RECIPE: { actions: [actions.updateContext, actions.callback] },
        DELETE_RECIPE: {
          target: 'gettingMaxCode',
          actions: [actions.resetContext, actions.callback],
        },
        TOGGLE: { actions: [actions.toggleSwitch, actions.callback] },
        ADD_ITEM: { actions: [actions.assignItem, actions.callback] },
        DELETE_ITEM: { actions: [actions.deleteItem, actions.callback] },
        RESET: { actions: [actions.resetContext, actions.callback] },
        ADD_ROW: { actions: [actions.addItemToStore, actions.callback] },
        DELETE_ROW: { actions: [actions.deleteItemFromStore, actions.callback] },
        RESTORE_DEFAULTS: { actions: [actions.restoreDefaults, actions.callback] },
        RECIPE_SUBMIT: {
          target: 'recipeSubmitting',
        },
        ELEMENT_SUBMIT: {
          target: 'elementSubmitting',
        },
        PRODUCT_SUBMIT: {
          target: 'productSubmitting',
        },
      },
    },
    gettingMaxCode: {
      invoke: {
        src: services.getMaxCode,
        onDone: {
          target: 'editting',
          actions: [actions.assignCode],
        },
        onError: {
          target: 'editting',
          actions: ['renderError'],
        },
      },
    },
    elementSubmitting: {
      invoke: {
        src: services.setElement,
        onDone: {
          target: 'editting',
          actions: ['renderSuccess', actions.callback],
        },
        onError: {
          target: 'editting',
          actions: ['renderError'],
        },
      },
    },
    productSubmitting: {
      invoke: {
        src: services.setProduct,
        onDone: {
          target: 'editting',
          actions: ['renderSuccess', actions.callback],
        },
        onError: {
          target: 'editting',
          actions: ['renderError'],
        },
      },
    },
    recipeSubmitting: {
      initial: 'settingRecipe',
      states: {
        settingRecipe: {
          invoke: {
            src: services.setRecipe,
            onDone: [
              {
                cond: guards.doesRecipeExists,
                target: '#mainMachine.gettingMaxCode',
                actions: [actions.resetContext, actions.callback],
              },
              { target: 'settingMaxCode' },
            ],
            onError: {
              target: '#mainMachine.editting',
              actions: ['renderError'],
            },
          },
        },
        settingMaxCode: {
          entry: [actions.resetContext, actions.callback],
          invoke: {
            src: services.setMaxCode,
            onDone: {
              target: '#mainMachine.gettingMaxCode',
              actions: ['renderSuccess'],
            },
            onError: {
              target: '#mainMachine.editting',
              actions: ['renderError'],
            },
          },
        },
      },
    },
  },
});
