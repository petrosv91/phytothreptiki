const { default: Axios } = require('axios');

async function getData() {
  const result = await Axios.get('http://localhost:3001/api');
  const data = result.data;
  if (!data.sucess) {
    throw new Error(data.message);
  }
  return data.data;
}
async function deleteData({ id = 0 }) {
  const result = await Axios.delete(`http://localhost:3001/api/${id}sdf`);
  const data = result.data;
  if (!data.sucess) {
    throw new Error(data.message);
  }
  return data.data;
}

export { getData, deleteData };
