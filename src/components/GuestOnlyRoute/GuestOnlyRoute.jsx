import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from 'context';

const GuestOnlyRoute = ({ children, path }) => {
  const { user } = useContext(UserContext);
  if (user) return <Redirect to={path} />;
  return children;
};

export default GuestOnlyRoute;
