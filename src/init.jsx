import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ru, en } from './locales/index.js';
import { SocketContext } from './context.js';
import store from './slices';
import App from './App.jsx';
import buildtSocketApi from './buildSocketApi.js';

const init = (socketClient = io()) => {
  const i18Instance = i18n.createInstance();
  i18Instance
    .use(initReactI18next)
    .init({
      resources: { ru, en },
      lng: 'ru',
      fallbackLng: 'en',

      interpolation: {
        escapeValue: false,
      },
    });
  const socketApi = buildtSocketApi(socketClient);
  return (
    <Provider store={store}>
      <SocketContext.Provider value={socketApi}>
        <App />
      </SocketContext.Provider>
    </Provider>
  );
};

export default init;
