/**
|--------------------------------------------------
| END PROCESS SERVICE
|--------------------------------------------------
*/
import AxiosHelper from './AxiosHelper';
export default async function EndProcess(authToken, pSession) {
  const reqObj = {
    authenticationToken: authToken,
    processSession: pSession
  };
  await AxiosHelper(reqObj, 'EndProcess');
}
