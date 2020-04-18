import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers/rootReducer';
import * as serviceWorker from './serviceWorker';
import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

/* subscribe fires everytime the store gets interacted or updated */
/* getState prints the current state of store */
store.subscribe(() => console.log('New Store:', store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
