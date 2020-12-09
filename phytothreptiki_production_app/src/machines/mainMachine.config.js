import { assign } from 'xstate';

import { baseGetService } from '../api/services';

export const initialContext = {
  recipe: {},
  element: {},
  elementStore: [],
  product: {},
  productStore: [],
};

export const actions = {
  callback: (ctx, e) => {
    if (e.callback) e.callback();
    if (e.data?.callback) e.data.callback();
  },
  renderSuccess: (ctx, e) => {
    const { toast } = e.data;
    toast({ type: 'success', title: 'Επιτυχής καταχώρηση' });
  },
  renderError: (ctx, e) => {
    const { toast, message } = e.data;
    toast({ type: 'error', title: 'Αποτυχία', content: message });
  },
  resetContext: assign((ctx, e) => {
    return { ...initialContext };
  }),
  assignItem: assign((ctx, e) => {
    return { ...ctx, [e.key]: e.data };
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
  updateContext: assign((ctx, e) => {
    return {
      elementStore: e.elements,
      productStore: e.products,
    };
  }),
};

export const guards = {};

export const services = {
  setRecipe: async (ctx, e) => {
    try {
      const { elementStore, productStore } = ctx;
      const data = { ...e.data, elements: elementStore, products: productStore };
      const result = await baseGetService({ service: 'setRecipe', data });
      return { result, ...e };
    } catch (error) {
      throw Object.assign(new Error(error), { toast: e.toast, message: error.message });
    }
  },
  setElement: async (ctx, e) => {
    try {
      const result = await baseGetService({ service: 'setElement', data: { ...e.data } });
      return { result, ...e };
    } catch (error) {
      throw Object.assign(new Error(error), { toast: e.toast, message: error.message });
    }
  },
  setProduct: async (ctx, e) => {
    try {
      const result = await baseGetService({ service: 'setProduct', data: { ...e.data } });
      return { result, ...e };
    } catch (error) {
      throw Object.assign(new Error(error), { toast: e.toast, message: error.message });
    }
  },
};
