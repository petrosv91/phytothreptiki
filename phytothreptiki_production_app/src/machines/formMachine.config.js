import { assign } from 'xstate';

export const actions = {
  callback: (ctx, e) => {
    if (e.callback) e.callback();
  },
  assignItem: assign((ctx, e) => {
    return { ...ctx, [e.key]: { ...e.data } };
  }),
  deleteItem: assign((ctx, e) => {
    return { ...ctx, [e.key]: {} };
  }),
  addItemToStore: assign((ctx, e) => {
    return { ...ctx, [e.key]: [...ctx[e.key], { ...e.data }] };
  }),
  deleteItemFromStore: assign((ctx, e) => {
    const updatedStore = ctx[e.key].filter((item) => item.id !== e.row.id);
    return { ...ctx, [e.key]: updatedStore };
  }),
};

export const guards = {};

export const services = {};
