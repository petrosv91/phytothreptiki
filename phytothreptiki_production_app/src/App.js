import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { ReactQueryConfigProvider } from 'react-query';

import { darkTheme, lightTheme, useReactQueryConfig } from './config';
import { useThemeMode } from './context/themeModeProvider';
import Menu from './menu';

function App() {
  const { currentTheme } = useThemeMode();
  const overrides = useReactQueryConfig();
  return (
    <ChakraProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
      <ReactQueryConfigProvider config={overrides}>
        <Menu />
      </ReactQueryConfigProvider>
    </ChakraProvider>
  );
}

export default App;
