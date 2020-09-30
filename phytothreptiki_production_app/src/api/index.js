const { default: Axios } = require('axios');

async function baseGetService() {
  const result = await Axios.get('http://localhost:3001/api');
  const data = result.data;
  if (!data.sucess) {
    throw new Error(data.message);
  }
  return data.data;
}

export default baseGetService;
