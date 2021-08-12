import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import GuestOnlyRoute from 'components/GuestOnlyRoute';
import Header from 'components/Header';
import LoginPage from 'components/LoginPage';
import NotFoundPage from 'components/NotFoundPage';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <Switch>
        <Route exact path="/">
          <PrivateRoute path="/login">
            <Header />
            <div>Chat</div>
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
);

export default App;
