import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const PrivateRoute = ({ children, redirectPath }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Redirect to={redirectPath} />;
  return children;
};

export default PrivateRoute;
