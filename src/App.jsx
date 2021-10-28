import React, { useCallback, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AuthContext } from './AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import GuestOnlyRoute from './components/GuestOnlyRoute';
import Header from './components/Header';
import Chat from './components/Chat';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import NotFoundPage from './components/NotFoundPage';
import Modal from './components/Modal';
import { getModalData } from './selectors';
import { actions } from './slices';

const App = () => {
  const { user, logOut } = useContext(AuthContext);
  const { isOpened, type, extraData } = useSelector(getModalData);
  const dispatch = useDispatch();
  useEffect(() => {
  }, []);
  const closeModal = useCallback(
    () => dispatch(actions.closeModal()),
    [dispatch],
  );
  return (
    <>
      <div className="d-flex flex-column h-100" aria-hidden={isOpened}>
        <Router>
          <Switch>
            <Route exact path="/">
              <PrivateRoute redirectPath="/login">
                <Header user={user} logout={logOut} />
                <Chat />
              </PrivateRoute>
            </Route>
            <Route exact path="/login">
              <GuestOnlyRoute redirectPath="/">
                <Header user={user} logout={logOut} />
                <LoginPage />
              </GuestOnlyRoute>
            </Route>
            <Route exact path="/signup">
              <GuestOnlyRoute redirectPath="/">
                <Header user={user} logout={logOut} />
                <SignUpPage />
              </GuestOnlyRoute>
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </div>
      <Modal isOpened={isOpened} type={type} handleClose={closeModal} extraData={extraData} />
    </>
  );
};

export default App;
