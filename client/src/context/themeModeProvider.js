import React, { useContext } from 'react';

import { useLocalStorage } from '../hooks';

const ThemeModeContext = React.createContext();

function ThemeModeProvider({ children }) {
  const [storedValue, setValue] = useLocalStorage(`phytothreptikiTheme`, 'light');

  function toggleTheme() {
    setValue((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <ThemeModeContext.Provider value={{ currentTheme: storedValue, toggleTheme: toggleTheme }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (context === undefined) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return context;
}

export { ThemeModeProvider, useThemeMode };
