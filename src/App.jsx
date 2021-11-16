import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from './context';
import PrivateRoute from './components/PrivateRoute';
import GuestOnlyRoute from './components/GuestOnlyRoute';
import Header from './components/Header';
import Chat from './components/Chat';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import NotFoundPage from './components/NotFoundPage';

const App = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Router>
          <Header user={user} logout={logOut} />
          <Switch>
            <Route exact path="/">
              <PrivateRoute redirectPath="/login">
                <Chat />
              </PrivateRoute>
            </Route>
            <Route exact path="/login">
              <GuestOnlyRoute redirectPath="/">
                <LoginPage />
              </GuestOnlyRoute>
            </Route>
            <Route exact path="/signup">
              <GuestOnlyRoute redirectPath="/">
                <SignUpPage />
              </GuestOnlyRoute>
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
