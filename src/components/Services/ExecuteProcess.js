/* EXECUTE PROCESS COMMAND */
import AxiosHelper from '../Services/AxiosHelper';
async function ExecuteProcessCommand(
  authenticationToken,
  commandName,
  processSession
) {
  try {
    //create the request object
    const requestObject = {
      authenticationToken,
      commandName,
      processSession
    };
    const result = await AxiosHelper(requestObject, 'ExecuteProcessCommand');
    return result;
  } catch (error) {
    console.log(error);
  }
}
export default ExecuteProcessCommand;
