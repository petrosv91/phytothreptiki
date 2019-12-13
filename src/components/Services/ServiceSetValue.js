import axios from 'axios';
import { Url } from './Api';
export const ServiceSetValue = async (requestObject, ServiceSetValue) => {
  try {
    const response = await axios.post(Url + ServiceSetValue, requestObject);
    const stringResult = ServiceSetValue + 'Result';
    if (response.data && response.data[stringResult].Success) {
      return response.data[stringResult];
    } else {
      return { error: true, messages: response.data[stringResult].Messages };
    }
  } catch (error) {
    return { error: true, messages: JSON.stringify(error) };
  }
};
