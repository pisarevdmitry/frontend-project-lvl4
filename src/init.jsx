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
import SocketProvider from './SocketProvider.jsx';

const init = (socketClient = io()) => {
  const i18Instance = i18n.createInstance();
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
          <SocketProvider socketClient={socketClient}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SocketProvider>
        </I18nextProvider>
      </Provider>
    ));
};

export default init;
