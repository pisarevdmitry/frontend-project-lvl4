import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from 'context';

const PrivateRoute = ({ children, path }) => {
  const { user } = useContext(UserContext);
  if (!user) return <Redirect to={path} />;
  return children;
};

export default PrivateRoute;