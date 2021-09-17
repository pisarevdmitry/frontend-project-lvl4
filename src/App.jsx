import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import * as yup from 'yup';
import storage from './storage.js';
import { yup as yupLocale } from './locales';
import { UserContext, SocketContext } from './context.js';
import PrivateRoute from 'components/PrivateRoute';
import GuestOnlyRoute from 'components/GuestOnlyRoute';
import Header from 'components/Header';
import Chat from 'components/Chat';
import LoginPage from 'components/LoginPage';
import SignUpPage from 'components/SignUpPage';
import NotFoundPage from 'components/NotFoundPage';
import Modal from 'components/Modal';
import initTranslation from './init18n';
import store from './reducers';

const init = (socketClient = io) => {
  yup.setLocale(yupLocale);
  initTranslation();
  const getUserData = () => {
    const storageData = localStorage.getItem(storage.getTokenKey());
    return JSON.parse(storageData);
  };

  const socket = socketClient(window.location.host, { autoConnect: false });

  const App = () => {
    useEffect(() => {
    }, []);
    const [user, updateUser] = useState(getUserData());
    const logout = useCallback(
      () => {
        localStorage.removeItem(storage.getTokenKey());
        updateUser(null);
      },
      [user],
    );
    return (
      <Provider store={store}>
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
                  <Route exact path="/signup">
                    <GuestOnlyRoute redirectPath="/">
                      <Header user={user} logout={logout} />
                      <SignUpPage />
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
      </Provider>

    );
  };
  return App;
};

export default init;
