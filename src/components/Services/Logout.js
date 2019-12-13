/**
|--------------------------------------------------
| LOGOUT
|--------------------------------------------------
*/
import AxiosHelper from './AxiosHelper';

export const Logout = async () => {
  const reqObj = {
    authenticationToken: localStorage.getItem('AuthenticationToken') //auth token
  };
  await AxiosHelper(reqObj, 'Logout');
  localStorage.clear();
  window.location.href = '/';
};
