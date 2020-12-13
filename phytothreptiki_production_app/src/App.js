import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';
import { ReactQueryConfigProvider } from 'react-query';

import { darkTheme, lightTheme, useReactQueryConfig } from './config';
import { useThemeMode } from './context/themeModeProvider';
import Home from './pages/home';

const GlobalStyles = css`
  body {
    overflow: hidden;
  }
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
  @media print {
    html,
    body {
      height: 100%;
      width: 100%;
      padding: 25px;
      display: flex;
      align-content: center;
      justify-content: center;
    }
    @page {
      size: portrait;
    }
  }
`;
function App() {
  const { currentTheme } = useThemeMode();
  const overrides = useReactQueryConfig();
  return (
    <ChakraProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
      <ReactQueryConfigProvider config={overrides}>
        <Home />
        <Global styles={GlobalStyles} />
      </ReactQueryConfigProvider>
    </ChakraProvider>
  );
}

export default App;
