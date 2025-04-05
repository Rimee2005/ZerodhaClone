import React, { createContext, useState } from "react";

// Create Context
export const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  const [state, setState] = useState({}); // Example state (modify as needed)

  return (
    <GeneralContext.Provider value={{ state, setState }}>
      {children}
    </GeneralContext.Provider>
  );
};
