import { assign } from 'xstate';

export const actions = {
  callback: (ctx, e) => {
    if (e.callback) e.callback();
  },
  addItemToStore: assign({
    store: (ctx, e) => {
      return [...ctx.store, { id: e.id, label: e.label, rate: e.rate, formula: e.formula }];
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
