/**
|--------------------------------------------------
| Basket Provider 
|--------------------------------------------------
*/
import React, { createContext, useReducer } from 'react';
import basketReducer from '../reducers/basket-context-reducer';
export const BasketContext = createContext();
export function BasketProvider(props) {
  const [basket, Bdispatch] = useReducer(basketReducer, []);
  return (
    <BasketContext.Provider value={{ basket, Bdispatch }}>
      {props.children}
    </BasketContext.Provider>
  );
}
