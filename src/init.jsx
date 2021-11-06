import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { ru, en } from './locales/index.js';
import store from './slices';
import App from './App.jsx';
import AuthProvider from './AuthProvider.jsx';
import { SocketContext } from './context';
import buildSocketApi from './buildSocketApi.js';

const init = (socketClient = io()) => {
  const i18Instance = i18n.createInstance();
  const socketApi = buildSocketApi(socketClient);
  return i18Instance
    .use(initReactI18next)
    .init({
      resources: { ru, en },
      lng: 'ru',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    }).then(() => (
      <Provider store={store}>
        <I18nextProvider i18n={i18Instance}>
          <SocketContext.Provider value={socketApi}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SocketContext.Provider>
        </I18nextProvider>
      </Provider>
    ));
};

export default init;
