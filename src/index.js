import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const userData = {
  UserName: localStorage.getItem('UserName'),
  AuthenticationToken: localStorage.getItem('AuthenticationToken'),
  loginStatus: Number(localStorage.getItem('LoginStatus'))
};

ReactDOM.render(<App userData={userData} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
