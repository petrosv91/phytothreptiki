/* FLOW PROVIDER THAT PROVIDES FLOW CONTEXT TO CHILDREN COMPONONENTS */
import React, { createContext, useState } from "react";
export const FlowContext = createContext();
export function FlowProvider(props) {
  const [flow, setFlow] = useState({});
  return (
    <FlowContext.Provider value={{ flow, setFlow }}>
      {props.children}
    </FlowContext.Provider>
  );
}
