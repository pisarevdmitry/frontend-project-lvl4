import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context.js';

const PrivateRoute = ({ children, redirectPath }) => {
  const { user } = useContext(UserContext);
  if (!user) return <Redirect to={redirectPath} />;
  return children;
};

export default PrivateRoute;
