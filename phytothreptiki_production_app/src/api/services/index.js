const { default: Axios } = require('axios');

const API = 'http://localhost:3001/api';

async function baseGetService(params) {
  const result = await Axios.post(API, params);
  const data = result.data;
  if (!data.success) {
    throw new Error(data.message);
  }
  return data;
}

// async function getData() {
//   const result = await Axios.get('', { service: 'getElements' });
//   const data = result.data;
//   if (!data.sucess) {
//     throw new Error(data.message);
//   }
//   return data.data;
// }
// async function deleteData({ id = 0 }) {
//   const result = await Axios.delete(`http://localhost:3001/api/${id}`);
//   const data = result.data;
//   if (!data.sucess) {
//     throw new Error(data.message);
//   }
//   return data.data;
// }

export { baseGetService };
