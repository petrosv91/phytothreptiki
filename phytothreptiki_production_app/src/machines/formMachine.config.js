import { assign } from 'xstate';

export const actions = {
  callback: (ctx, e) => {
    if (e.callback) e.callback();
  },
  assignElement: assign({
    element: (ctx, e) => {
      return { label: e.el.label, formula: e.el.formula };
    },
  }),
  addItemToStore: assign({
    store: (ctx, e) => {
      return [
        ...ctx.store,
        {
          id: e.id,
          rate: e.rate,
          price: e.price,
          label: e.label,
          formula: e.formula,
          restPrice: e.restPrice,
        },
      ];
    },
  }),
  deleteElement: assign({
    element: (ctx, e) => {
      return {};
    },
  }),
  deleteItemFromStore: assign({
    store: (ctx, e) => {
      const updatedStore = ctx.store.filter((el) => el.id !== e.el.id);
      return updatedStore;
    },
  }),
};

export const guards = {};

export const services = {};
