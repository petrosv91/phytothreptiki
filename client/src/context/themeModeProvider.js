import { createContext, useContext } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';

import { darkTheme, GlobalStyles, lightTheme } from '../config';
import { useLocalStorage } from '../hooks';

const ThemeModeContext = createContext();

function ThemeModeProvider({ children }) {
  const [storedValue, setValue] = useLocalStorage('phytothreptikiTheme', 'light');

  function toggleTheme() {
    setValue((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <ThemeModeContext.Provider
      value={{ currentTheme: storedValue, toggleTheme: toggleTheme }}
    >
      <ChakraProvider theme={storedValue === 'dark' ? darkTheme : lightTheme}>
        {children}
        <Global styles={GlobalStyles} />
      </ChakraProvider>
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
