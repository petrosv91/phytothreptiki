import React from 'react';

import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import ReactDOM from 'react-dom';

import App from './app';
import { customTheme } from './config';
import { RecipeProvider } from './context/recipeProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <RecipeProvider>
        <App />
        <CSSReset />
      </RecipeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
