import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import PubSub, { PubSubContext } from './pubsub';
import App from './components/App';
import rootReducer from './reducers/rootReducer';
import * as serviceWorker from './serviceWorker';
import './index.css';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => console.log('store.getState', store.getState()));

const pubsub = new PubSub();
pubsub.addListener({
  message: messageObject => {
    const { message, channel } = messageObject;
    console.log('Received message:', message, 'channel:', channel);
    store.dispatch(message);
  }
});

ReactDOM.render(
  <Provider store={store}>
    <PubSubContext.Provider value={{ pubsub }}>
      <App />
    </PubSubContext.Provider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
