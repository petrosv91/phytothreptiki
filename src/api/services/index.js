const { default: Axios } = require('axios');

const API = 'http://localhost:5000/api';

async function baseGetService(params) {
  const result = await Axios.post(API, params);
  const data = result.data;
  if (!data.success) {
    throw new Error(data.message);
  }
  return data;
}

export { baseGetService };
