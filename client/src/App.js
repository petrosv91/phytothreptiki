import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import { css, Global } from '@emotion/react';

import { darkTheme, lightTheme } from './config';
import { useThemeMode } from './context/themeModeProvider';
import Home from './pages/home';

const GlobalStyles = css`
  body {
    overflow: hidden;
  }
  .js-focus-visible:focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
  @media print {
    html,
    body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
      table.print > thead > tr > th {
        padding: 10px;
        font-size: 16px;
        line-height: 16px;
      }
      table.print > tbody > tr > td {
        padding: 10px;
        font-size: 16px;
        line-height: 20px;
      }
      table.print > tbody > tr {
        page-break-inside: avoid;
      }
      table.print > thead {
        display: table-row-group;
      }
    }
    #page,
    #page * {
      page-break-inside: avoid;
      visibility: visible;
    }
    @page {
      size: auto;
      margin: 5mm 10mm;
    }
  }
`;
function App() {
  const { currentTheme } = useThemeMode();
  return (
    <ChakraProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
      <Global styles={GlobalStyles} />
      <Home />
    </ChakraProvider>
  );
}

export default App;
