import { assign } from 'xstate';

export const actions = {
  callback: (ctx, e) => {
    if (e.callback) e.callback();
  },
  assignElement: assign({
    element: (ctx, e) => {
      return e.element;
    },
  }),
};
