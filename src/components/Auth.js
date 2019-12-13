/**
|--------------------------------------------------
| Authentication Functions
|--------------------------------------------------
*/
import React from 'react';
import { Redirect } from 'react-router-dom';
//protect component if user is not authorized
function renderProtectedComponent(ProtectedComponent, username) {
  const loginStatus = Number(localStorage.getItem('LoginStatus'));
  if (loginStatus === 2) return () => <Redirect to="/changePassword" />;
  if (username !== null) {
    return props => <ProtectedComponent {...props} />;
  }
  //else redirect to login
  else {
    return () => <Redirect to="/" />;
  }
}

function changePasswordComponent(ProtectedComponent, username) {
  if (username !== null) {
    return props => <ProtectedComponent {...props} />;
  }
  //else redirect to login
  else {
    return () => <Redirect to="/" />;
  }
}
//function to check if user is already logged in(only for Login Page )
function isLoggedIn(IsLoggedInComponent, username) {
  //if user is not logged in then render the login Page
  if (username === null) {
    return props => <IsLoggedInComponent {...props} />;
  }
  //else redirect him to UserPage
  else {
    return () => <Redirect to="/userpage" />;
  }
}

export { isLoggedIn, renderProtectedComponent, changePasswordComponent };
