import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';

import { darkTheme, lightTheme, GlobalStyles } from './config';
import { MainMachineProvider } from './context/mainMachineProvider';
import { useThemeMode } from './context/themeModeProvider';
import Home from './pages/home';

function App() {
  const { currentTheme } = useThemeMode();
  return (
    <ChakraProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
      <MainMachineProvider>
        <Global styles={GlobalStyles} />
        <Home />
      </MainMachineProvider>
    </ChakraProvider>
  );
}

export default App;
