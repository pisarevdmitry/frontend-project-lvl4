import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import storage from 'storage';
import { UserContext, SocketContext } from 'context';
import PrivateRoute from 'components/PrivateRoute';
import GuestOnlyRoute from 'components/GuestOnlyRoute';
import Header from 'components/Header';
import Chat from 'components/Chat';
import LoginPage from 'components/LoginPage';
import NotFoundPage from 'components/NotFoundPage';
import Modal from 'components/Modal';

const getUserData = () => {
  const storageData = localStorage.getItem(storage.getTokenKey());
  return JSON.parse(storageData);
};

const socket = io(window.location.host, { autoConnect: false });

const App = () => {
  const [user, updateUser] = useState(getUserData());
  const logout = useCallback(
    () => {
      localStorage.removeItem(storage.getTokenKey());
      updateUser(null);
    },
    [user],
  );
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      <SocketContext.Provider value={{ socket }}>
        <div className="d-flex flex-column h-100">
          <Router>
            <Switch>
              <Route exact path="/">
                <PrivateRoute redirectPath="/login">
                  <Header user={user} logout={logout} />
                  <Chat />
                </PrivateRoute>
              </Route>
              <Route exact path="/login">
                <GuestOnlyRoute redirectPath="/">
                  <Header user={user} logout={logout} />
                  <LoginPage />
                </GuestOnlyRoute>
              </Route>
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
          </Router>
        </div>
        <Modal />
      </SocketContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
