import React, { useState } from 'react';
import axios from 'axios';
import apiRoutes from './routes.js';

const AuthContext = React.createContext();
const TOKEN_KEY = 'APP_KEY';

const getUserData = () => {
  const storageData = localStorage.getItem(TOKEN_KEY);
  return JSON.parse(storageData);
};

const AuthProvider = ({ children }) => {
  const [user, updateUser] = useState(getUserData());
  const logIn = (username, password) => axios.post(apiRoutes.loginPath(), { username, password })
    .then(({ data }) => {
      const updatedUser = { token: data.token, userName: data.username };
      localStorage.setItem(TOKEN_KEY,
        JSON.stringify(updatedUser));
      updateUser(updatedUser);
    })
    .catch(() => {
      throw new Error('errors.forbidden');
    });
  const signUp = (username, password) => axios.post(apiRoutes.signUpPath(), { username, password })
    .then(({ data }) => {
      const updatedUser = { token: data.token, userName: data.username };
      localStorage.setItem(TOKEN_KEY,
        JSON.stringify(updatedUser));
      updateUser(updatedUser);
    })
    .catch((e) => {
      if (e.response.data.statusCode === 409) {
        throw new Error('errors.exists');
      }
    });
  const logOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    updateUser(null);
  };
  return (
    <AuthContext.Provider value={{
      logIn, signUp, logOut, user,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };
