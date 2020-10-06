import { assign } from 'xstate';

export const actions = {
  callback: (ctx, e) => {
    if (e.callback) e.callback();
  },
  updateTable: assign({
    elements: (ctx, e) => {
      return [...ctx.elements, { id: e.id, label: e.label, rate: e.rate, formula: e.formula }];
    },
  }),
  deleteElement: assign({
    elements: (ctx, e) => {
      const updatedTable = ctx.elements.filter((el) => el.id !== e.el.id);
      return updatedTable;
    },
  }),
};

export const guards = {};

export const services = {};
