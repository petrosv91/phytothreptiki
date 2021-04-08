import { assign } from 'xstate';

import { baseGetService } from '../api/services';

export const initialContext = {
  recipeId: undefined,
  switches: {},
  updatedItem: {},
  elementStore: [],
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
      recipeId: e.id,
      code: e.code || ctx.code,
      elementStore: e.elements || [],
      productStore: e.products || [],
    };
  }),
  toggleSwitch: assign((ctx, e) => {
    return {
      ...ctx,
      switches: { ...ctx.switches, [e.key]: !ctx.switches[e.key] },
    };
  }),
  restoreDefaults: assign((ctx, e) => {
    return { ...ctx, ...e.data };
  }),
};

export const guards = {
  doesRecipeExists: (ctx, e) => {
    return e.data.result.exists;
  },
};

export const services = {
  getMaxCode: async (ctx, e) => {
    try {
      const result = await baseGetService({ service: 'getMaxCode' });
      return { result, ...e };
    } catch (error) {
      throw Object.assign(new Error(error), { toast: e.toast, message: error.message });
    }
  },
  setMaxCode: async (ctx, e) => {
    try {
      const { code, codeId } = ctx;
      const result = await baseGetService({
        service: 'setMaxCode',
        data: { code, codeId },
      });
      return { result, ...e };
    } catch (error) {
      throw Object.assign(new Error(error), {
        toast: e.toast,
        message: `Ο κωδικός δεν αυξήθηκε: ${error.message}`,
      });
    }
  },
  setRecipe: async (ctx, e) => {
    try {
      const { recipeId, elementStore, productStore } = ctx;
      const result = await baseGetService({
        service: 'setRecipe',
        data: { ...e.data, id: recipeId, elements: elementStore, products: productStore },
      });
      return { result, ...e };
    } catch (error) {
      throw Object.assign(new Error(error), {
        toast: e.toast,
        message: `Η συνταγή δεν αποθηκεύτηκε: ${error.message}`,
      });
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
