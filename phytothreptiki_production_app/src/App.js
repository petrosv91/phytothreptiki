import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryConfigProvider } from 'react-query';

import { darkTheme, lightTheme, useReactQueryConfig } from './config';
import { useThemeMode } from './context/themeModeProvider';
import Home from './pages/home';

function App() {
  const { currentTheme } = useThemeMode();
  const overrides = useReactQueryConfig();
  return (
    <ChakraProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
      <ReactQueryConfigProvider config={overrides}>
        <Home />
      </ReactQueryConfigProvider>
    </ChakraProvider>
  );
}

export default App;
