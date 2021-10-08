import axios from 'axios';
import apiRoutes from './routes.js';
import storage from './storage.js';

const buildAuthApi = (updateUser) => {
  const logIn = (username, password) => axios.post(apiRoutes.loginPath(), { username, password })
    .then(({ data }) => {
      const user = { token: data.token, userName: data.username };
      localStorage.setItem(storage.getTokenKey(),
        JSON.stringify(user));
      updateUser(user);
    })
    .catch(() => {
      throw new Error('errors.forbidden');
    });

  const signUp = (username, password) => axios.post(apiRoutes.signUpPath(), { username, password })
    .then(({ data }) => {
      const user = { token: data.token, userName: data.username };
      localStorage.setItem(storage.getTokenKey(),
        JSON.stringify(user));
      updateUser(user);
    })
    .catch((e) => {
      if (e.response.data.statusCode === 409) {
        throw new Error('errors.exists');
      }
    });

  const logOut = () => {
    localStorage.removeItem(storage.getTokenKey());
    updateUser(null);
  };

  return {
    logIn,
    logOut,
    signUp,
  };
};

export default buildAuthApi;
