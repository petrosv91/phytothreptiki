import { createMachine } from 'xstate';

import { actions } from './recipeMachine.config';

export const RecipeMachine = createMachine({
  id: 'recipe',
  initial: 'fillingForm',
  context: {
    element: '',
  },
  states: {
    fillingForm: {
      on: {
        PICK_ELEMENT: { actions: [actions.assignElement, actions.callback] },
      },
    },
  },
});
