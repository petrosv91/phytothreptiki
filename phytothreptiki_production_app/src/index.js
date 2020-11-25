import React from 'react';

import ReactDOM from 'react-dom';

import App from './app';
import { ColorModeProvider } from './context/colorModeProvider';
import { ThemeModeProvider } from './context/themeModeProvider';
import * as serviceWorker from './serviceWorker';

import 'focus-visible/dist/focus-visible';

ReactDOM.render(
  <React.StrictMode>
    <ThemeModeProvider>
      <ColorModeProvider>
        <App />
      </ColorModeProvider>
    </ThemeModeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
