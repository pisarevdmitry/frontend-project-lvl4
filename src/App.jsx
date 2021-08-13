import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import UserContext from 'context';
import GuestOnlyRoute from 'components/GuestOnlyRoute';
import Header from 'components/Header';
import Chat from 'components/Chat';
import storage from 'storage';
import LoginPage from 'components/LoginPage';
import NotFoundPage from 'components/NotFoundPage';

const getUserData = () => {
  const storageData = localStorage.getItem(storage.getTokenKey());
  return JSON.parse(storageData);
};

const App = () => {
  const [user, updateUser] = useState(getUserData());
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      <div className="d-flex flex-column h-100">
        <Router>
          <Switch>
            <Route exact path="/">
              <PrivateRoute path="/login">
                <Header />
                <Chat />
              </PrivateRoute>
            </Route>
            <Route exact path="/login">
              <GuestOnlyRoute path="/">
                <Header />
                <LoginPage />
              </GuestOnlyRoute>
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
};

export default App;
