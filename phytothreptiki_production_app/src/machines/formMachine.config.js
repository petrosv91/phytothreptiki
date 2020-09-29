import { assign } from 'xstate';

export const actions = {
  callback: (ctx, e) => {
    if (e.callback) e.callback();
  },
  updateTable: assign({
    elements: (ctx, e) => {
      return [...ctx.elements, { label: e.label, rate: e.rate, formula: e.formula }];
    },
  }),
};

export const guards = {};

export const services = {};
