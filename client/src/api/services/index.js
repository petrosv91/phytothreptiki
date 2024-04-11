import axios from 'axios';

const DEV_API = 'http://localhost:3001/api';
const PROD_API = '/api';

const DEV_FILES = 'http://localhost:3001/file';
const PROD_FILES = '/files';

const API = process.env.NODE_ENV === 'development' ? DEV_API : PROD_API;
export const FILES_API = process.env.NODE_ENV === 'development' ? DEV_FILES : PROD_FILES;

async function baseGetService(params) {
  const result = await axios.post(API, params);
  const data = result.data;
  if (!data.success) {
    throw new Error(data.message);
  }
  return data;
}

async function uploadFile(file) {
  const result = await axios.post(`${FILES_API}`, file);
  return result.data;
}
async function deleteFile(fileId) {
  const result = await axios.delete(`${FILES_API}/${fileId}`);
  return result.data;
}

export { baseGetService, uploadFile, deleteFile };
