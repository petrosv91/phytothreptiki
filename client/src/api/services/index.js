const { default: Axios } = require('axios');

// const DEV_API = 'http://localhost:5000/api';
// const PROD_API = 'http://localhost:5000/api';

// const API = process.env.NODE_ENV === 'development' ? DEV_API : PROD_API;

const API = '/api';

async function baseGetService(params) {
  const result = await Axios.post(API, params);
  const data = result.data;
  if (!data.success) {
    throw new Error(data.message);
  }
  return data;
}

export { baseGetService };
