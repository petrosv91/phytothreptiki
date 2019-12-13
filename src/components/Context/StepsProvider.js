/* STEPS PROVIDER PROVIDES INFORMATION ABOUT CURRENT USER STEPS AND INFORMATION ABOUT THEM */
import React, { createContext, useReducer } from 'react';
import stepsReducer from '../reducers/steps-context-reducer';
export const StepsContext = createContext();
export function StepsProvider(props) {
  const [steps, dispatch] = useReducer(stepsReducer, '');
  return (
    <StepsContext.Provider value={{ steps, dispatch }}>
      {props.children}
    </StepsContext.Provider>
  );
}
