import React, { useContext } from 'react';

import { useLocalStorage } from '../hooks';

const ColorModeContext = React.createContext();

function ColorModeProvider({ children }) {
  const [storedValue, setValue] = useLocalStorage(`color`, 'teal');
  function handleColorChange(color) {
    setValue(color);
  }

  return (
    <ColorModeContext.Provider
      value={{ currentColor: storedValue, colorChange: handleColorChange }}
    >
      {children}
    </ColorModeContext.Provider>
  );
}

function useColorMode() {
  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
}

export { ColorModeProvider, useColorMode };
