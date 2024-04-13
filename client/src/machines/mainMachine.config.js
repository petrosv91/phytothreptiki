import { assign } from 'xstate';

import { baseGetService, deleteFile, uploadFile } from '../api/services';

export const initialContext = {
  file: undefined,
  oldFile: undefined,
  recipeId: undefined,
  switches: {},
  formData: {},
  updatedItem: {},
  elementStore: [],
  productStore: [],
};

export const actions = {
  callback: (ctx, e) => {
    if (e.callback) e.callback();
    if (e.data?.callback) e.data.callback();
  },
  resetContext: assign(() => {
    return { ...initialContext };
  }),
  assignItem: assign((ctx, e) => {
    return { ...ctx, [e.key]: e.data };
  }),
  assignCode: assign((ctx, e) => {
    const [{ _id = 0, code } = {}] = e.data.result.data;
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
      file: e.file || undefined,
      oldFile: e.file || undefined,
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
  saveFormData: assign({ formData: (_, e) => e.formData }),
  deleteFile: assign({ file: () => undefined }),
  saveFile: assign({ file: (_, e) => e.file }),
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
      const result = await baseGetService({
        service: 'setRecipe',
        data: {
          ...ctx.formData,
          id: ctx.recipeId,
          file: {
            id: e.data?.file?.id,
            name: ctx.file?.name,
          },
          elements: ctx.elementStore,
          products: ctx.productStore,
        },
      });
      return { result, ...e };
    } catch (error) {
      throw Object.assign(new Error(error), {
        toast: e.toast,
        message: `Η συνταγή δεν αποθηκεύτηκε: ${error.message}`,
      });
    }
  },
  setFile: async (ctx) => {
    return await uploadFile(ctx.file.formData);
  },
  deleteFile: async (ctx) => {
    return await deleteFile(ctx.oldFile.id);
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
