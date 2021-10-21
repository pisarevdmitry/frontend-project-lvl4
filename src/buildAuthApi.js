import axios from 'axios';
import apiRoutes from './routes.js';

export const TOKEN_KEY = 'APP_KEY';

const buildAuthApi = (updateUser) => {
  const logIn = (username, password) => axios.post(apiRoutes.loginPath(), { username, password })
    .then(({ data }) => {
      const user = { token: data.token, userName: data.username };
      localStorage.setItem(TOKEN_KEY,
        JSON.stringify(user));
      updateUser(user);
    })
    .catch(() => {
      throw new Error('errors.forbidden');
    });

  const signUp = (username, password) => axios.post(apiRoutes.signUpPath(), { username, password })
    .then(({ data }) => {
      const user = { token: data.token, userName: data.username };
      localStorage.setItem(TOKEN_KEY,
        JSON.stringify(user));
      updateUser(user);
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

  return {
    logIn,
    logOut,
    signUp,
  };
};

export default buildAuthApi;
