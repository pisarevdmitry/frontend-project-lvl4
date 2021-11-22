import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context';
import PrivateRoute from './components/PrivateRoute';
import GuestOnlyRoute from './components/GuestOnlyRoute';
import Header from './components/Header';
import Chat from './components/Chat';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import NotFoundPage from './components/NotFoundPage';
import routes from './routes';

const App = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Router>
          <Header user={user} logout={logOut} />
          <Switch>
            <Route exact path={routes.mainRoute()}>
              <PrivateRoute redirectPath={routes.loginRoute()}>
                <Chat />
              </PrivateRoute>
            </Route>
            <Route exact path={routes.loginRoute()}>
              <GuestOnlyRoute redirectPath={routes.mainRoute()}>
                <LoginPage />
              </GuestOnlyRoute>
            </Route>
            <Route exact path={routes.signUpRoute()}>
              <GuestOnlyRoute redirectPath={routes.mainRoute()}>
                <SignUpPage />
              </GuestOnlyRoute>
            </Route>
            <Route path={routes.notFoundRoutes()}>
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
};

export default App;
