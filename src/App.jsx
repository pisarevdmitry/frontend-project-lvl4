import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import storage from './storage.js';
import { UserContext } from './context.js';
import PrivateRoute from './components/PrivateRoute';
import GuestOnlyRoute from './components/GuestOnlyRoute';
import Header from './components/Header';
import Chat from './components/Chat';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import NotFoundPage from './components/NotFoundPage';
import Modal from './components/Modal';
import { getModalStatus } from './selectors';
import { actions } from './reducers';
import buildAuthApi from './buildAuthApi.js';

const getUserData = () => {
  const storageData = localStorage.getItem(storage.getTokenKey());
  return JSON.parse(storageData);
};

const App = () => {
  const { isOpened, type } = useSelector(getModalStatus);
  const dispatch = useDispatch();
  useEffect(() => {
  }, []);
  const [user, updateUser] = useState(getUserData());
  const authApi = buildAuthApi(updateUser);
  const closeModal = useCallback(
    () => dispatch(actions.closeModal()),
    [dispatch],
  );
  return (
    <UserContext.Provider value={{ user, ...authApi }}>
      <div className="d-flex flex-column h-100" aria-hidden={isOpened}>
        <Router>
          <Switch>
            <Route exact path="/">
              <PrivateRoute redirectPath="/login">
                <Header user={user} logout={authApi.logOut} />
                <Chat />
              </PrivateRoute>
            </Route>
            <Route exact path="/login">
              <GuestOnlyRoute redirectPath="/">
                <Header user={user} logout={authApi.logOut} />
                <LoginPage />
              </GuestOnlyRoute>
            </Route>
            <Route exact path="/signup">
              <GuestOnlyRoute redirectPath="/">
                <Header user={user} logout={authApi.logOut} />
                <SignUpPage />
              </GuestOnlyRoute>
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </div>
      <Modal isOpened={isOpened} type={type} handleClose={closeModal} />
    </UserContext.Provider>
  );
};

export default App;
