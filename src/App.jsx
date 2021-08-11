import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from 'components/Header';
import LoginPage from 'components/LoginPage';
import NotFoundPage from 'components/NotFoundPage';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <Switch>
        <Route exact path="/login">
          <Header />
          <LoginPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  </div>
);

export default App;
