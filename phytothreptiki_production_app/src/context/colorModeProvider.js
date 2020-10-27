import React, { useContext } from 'react';

const ColorModeContext = React.createContext();

function ColorModeProvider({ children }) {
  const [value, setValue] = React.useState('teal');
  function handleColorChange(color) {
    setValue(color);
  }
  return (
    <ColorModeContext.Provider value={{ currentColor: value, colorChange: handleColorChange }}>
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
