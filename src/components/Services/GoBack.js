import axios from 'axios';
import { Url } from './Api';
async function GoBack(authenticationToken, processSession) {
  try {
    const reqObj = { authenticationToken, processSession };
    const result = await axios.post(Url + 'GoBack', reqObj);
    return result.data.GoBackResult;
  } catch (error) {
    console.log(error);
    return { error: true, messages: 'Πρόβλημα Server' };
  }
}
export default GoBack;
