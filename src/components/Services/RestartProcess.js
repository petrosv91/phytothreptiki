/* RESTART PROCESS FUNCTOIN */
import axios from "axios";
import { Url } from "./Api";
async function RestartProcess(
  authenticationToken,
  lastProcessSession,
  flowId,
  processName
) {
  try {
    //create the request objext
    const requestObject = {
      authenticationToken,
      lastProcessSession,
      flowId,
      processName
    };
    //post request to server
    const response = await axios.post(Url + "RestartProcess", requestObject);
    if (response.data.RestartProcessResult.Success) {
      return {
        //operation ok then return the new ProcessSession
        error: false,
        ProcessSession: response.data.RestartProcessResult.ProcessSession
      };
    } else {
      //else return error and the error message
      return {
        error: true,
        Messages: response.data.RestartProcessResult.Messages
      };
    }
  } catch (error) {
    console.log(error);
  }
}

export default RestartProcess;
