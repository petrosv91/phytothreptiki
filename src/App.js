/* APP COMPONENT ,RENDERS ALL THE COMPONENTS */
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
// import './App.css';
import defaultTheme from './config/themes';
import { ErrorProvider } from './components/Context/ErrorProvider';
import { FlowProvider } from './components/Context/FlowProvider';
import { StepsProvider } from './components/Context/StepsProvider';
import GlobalStyle from './config/GlobalStyle';
import {
  isLoggedIn,
  renderProtectedComponent,
  changePasswordComponent
} from './components/Auth';
import HeartBeat from './components/HeartBeat/HeartBeat';
import ProcessSteps from './views/ProcessSteps';
import Loading from './components/Buttons/Loading';
import Notification from './components/Notification/Notification';
import ErrorBoundary from './components/Error/ErrorBoundary';
const UserPage = lazy(() => import('./views/UserPage'));
const HomePage = lazy(() => import('./views/HomePage'));
const ChangePassword = lazy(() => import('./views/ChangePassword'));
function App(props) {
  const [UserName, setUserName] = useState('');
  const username = props.userData.UserName;
  const [loading, setLoading] = useState(true);
  //set username into state
  useEffect(() => {
    setUserName(username);
    setLoading(false);
  }, [username]);
  if (loading) return <Loading />;
  else
    return (
      <ThemeProvider theme={defaultTheme}>
        <ErrorBoundary>
          <div className="App">
            {/* Provider for alerts */}
            <Suspense fallback={<Loading />}>
              <ErrorProvider>
                <HeartBeat Timeout={3600} />
                {/* Flow Provider */}
                <FlowProvider>
                  {/* React Router Provider */}
                  <BrowserRouter>
                    <Notification />
                    {/* Product Control Provider (Πληροφορίες για Είδος) */}
                    <Switch>
                      {/* homepage->login route */}
                      <Route
                        exact
                        path="/"
                        render={isLoggedIn(HomePage, UserName)}
                      />
                      {/* ChangePassword->change Password route*/}
                      <Route
                        path="/changePassword"
                        render={changePasswordComponent(
                          ChangePassword,
                          UserName
                        )}
                      />
                      {/* process steps page  */}
                      <StepsProvider>
                        <Route
                          exact
                          path="/process"
                          render={renderProtectedComponent(
                            ProcessSteps,
                            UserName
                          )}
                        />
                        {/* userpage->menu route */}
                        <Route
                          exact
                          path="/userpage"
                          render={renderProtectedComponent(UserPage, UserName)}
                        />
                      </StepsProvider>
                    </Switch>
                  </BrowserRouter>
                </FlowProvider>
              </ErrorProvider>
            </Suspense>
          </div>
        </ErrorBoundary>
        <GlobalStyle />
      </ThemeProvider>
    );
}

export default App;
