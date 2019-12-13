import axios from 'axios';
import { Url } from './Api';
const AxiosHelper = async (reqObj, path) => {
  try {
    const result = await axios.post(Url + path, reqObj);
    const objName = path + 'Result';
    if (result.data[objName].Success) {
      return result.data[objName];
    } else {
      if (result.data[objName].Messages === 'Invalid token!') {
        alert(result.data[objName].Messages);
        localStorage.clear();
        window.location.href = '/';
      }
      return { error: true, messages: result.data[objName].Messages };
    }
  } catch (error) {
    console.log(error);
    return { error: true, messages: 'Πρόβλημα Server' };
  }
};

export default AxiosHelper;
