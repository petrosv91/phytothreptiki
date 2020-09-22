import { createMachine } from 'xstate';

export const RecipeMachine = createMachine({
  id: 'recipe',
  initial: 'fillingForm',
  context: {},
  states: {
    fillingForm: {},
  },
});
