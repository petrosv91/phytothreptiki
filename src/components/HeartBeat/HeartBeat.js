/**
|--------------------------------------------------
| KEEP ALIVE COMPONENT
|--------------------------------------------------
*/

import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Url } from '../Services/Api';

//TIME OUT CONST
const TIMEOUT = 1000 * 60;

const HeartBeat = () => {
  const [sendData, setSendData] = useState(true);
  useEffect(() => {
    async function KeepAlive() {
      try {
        const authenticationToken = localStorage.getItem('AuthenticationToken'); //auth token
        console.log('Keep Alive');
        // if no token exists then return
        if (!authenticationToken) return;
        const reqObj = {
          authenticationToken
        };
        await Axios.post(Url + 'KeepAlive', reqObj);
        setSendData(false);
      } catch (error) {
        console.log(error);
      }
    }
    let timeout = setTimeout(KeepAlive, TIMEOUT);
    setSendData(true);

    return () => {
      //clear timeout
      clearTimeout(timeout);
    };
  }, [sendData]);

  return <></>;
};

export default HeartBeat;
