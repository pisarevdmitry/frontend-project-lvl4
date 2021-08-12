import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import storage from 'storage';

const PrivateRoute = ({ children, path }) => {
  const [isAuthorized, setIsAuthorized] = useState('initiated');
  useEffect(() => {
    if (localStorage.getItem(storage.getTokenKey())) {
      setIsAuthorized('success');
    } else {
      setIsAuthorized('failure');
    }
  }, []);
  if (isAuthorized === 'initiated') return null;
  if (isAuthorized === 'failure') return <Redirect to={path} />;
  return children;
};

export default PrivateRoute;
