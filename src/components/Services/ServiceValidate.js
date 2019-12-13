import axios from 'axios';
import { Url } from './Api';
export const ServiceValidate = async (requestObject, ServiceGetValue) => {
  try {
    const response = await axios.post(Url + ServiceGetValue, requestObject);
    const stringResult = ServiceGetValue + 'Result';
    if (response.data && response.data[stringResult].Success) {
      //parse the json object
      const result = JSON.parse(response.data[stringResult].DataJson);
      //return data
      return result;
    } else {
      return { error: true, messages: response.data[stringResult].Messages };
    }
  } catch (error) {
    return { error: true, messages: JSON.stringify(error) };
  }
};
