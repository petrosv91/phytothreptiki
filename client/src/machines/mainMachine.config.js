import { assign } from 'xstate';

import { baseGetService } from '../api/services';

export const initialContext = {
  recipeId: undefined,
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
  resetContext: assign((ctx, e) => {
    return { ...initialContext };
  }),
  assignItem: assign((ctx, e) => {
    return { ...ctx, [e.key]: e.data };
  }),
  assignCode: assign((ctx, e) => {
    const [{ _id, code }] = e.data.result.data;
    return { ...ctx, codeId: _id, code };
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
      code: e.code,
      recipeId: e.id,
      elementStore: e.elements,
      productStore: e.products,
    };
  }),
};

export const guards = {};

export const services = {
  setRecipe: async (ctx, e) => {
    try {
      const { recipeId, elementStore, productStore, codeId, code } = ctx;
      const data = {
        ...e.data,
        code,
        codeId,
        id: recipeId,
        elements: elementStore,
        products: productStore,
      };
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
  getMaxCode: async (ctx, e) => {
    try {
      const result = await baseGetService({ service: 'getMaxCode' });
      return { result, ...e };
    } catch (error) {
      throw Object.assign(new Error(error), { toast: e.toast, message: error.message });
    }
  },
};
