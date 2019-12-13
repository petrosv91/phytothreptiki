/**
|--------------------------------------------------
| Error Provider that provides error infomration to the App
|--------------------------------------------------
*/
import React, { createContext, useReducer } from 'react';
import errorReducer from '../reducers/error-context-reducer';
export const ErrorContext = createContext();
export function ErrorProvider(props) {
  const [message, Mdispatch] = useReducer(errorReducer, '');
  return (
    <ErrorContext.Provider value={{ message, Mdispatch }}>
      {props.children}
    </ErrorContext.Provider>
  );
}
