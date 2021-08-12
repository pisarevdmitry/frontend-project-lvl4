import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import storage from 'storage';

const GuestOnlyRoute = ({ children, path }) => {
  const [isAuthorized, setIsAuthorized] = useState('initiated');
  useEffect(() => {
    if (localStorage.getItem(storage.getTokenKey())) {
      setIsAuthorized('success');
    } else {
      setIsAuthorized('failure');
    }
  }, []);
  if (isAuthorized === 'initiated') return null;
  if (isAuthorized === 'success') return <Redirect to={path} />;
  return children;
};

export default GuestOnlyRoute;
