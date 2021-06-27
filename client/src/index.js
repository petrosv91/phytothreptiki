import { StrictMode } from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { MainMachineProvider } from './context/mainMachineProvider';
import { ThemeModeProvider } from './context/themeModeProvider';
import * as serviceWorker from './serviceWorker';
import 'focus-visible/dist/focus-visible';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeModeProvider>
        <MainMachineProvider>
          <App />
        </MainMachineProvider>
      </ThemeModeProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
