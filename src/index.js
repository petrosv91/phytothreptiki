import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import rootReducer from './reducers';
import './index.css';

const store = createStore(rootReducer); // Colecct the store of the entire react app
// this function allows us to initialize a store object by calling the create store method

// provider components allow the entire react app to connnect to the redux store
// a higher order component thats wraps the whole App
// take one key property, a store prop
ReactDOM.render(
    <Provider store={store}> 
        <App />
    </Provider>,  
    document.getElementById('root')
);
