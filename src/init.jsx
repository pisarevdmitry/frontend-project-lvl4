import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { ru, en } from './locales/index.js';
import store from './slices';
import App from './App.jsx';
import AuthProvider from './AuthProvider.jsx';
import { ApiContext } from './context';
import buildSocketApi from './buildSocketApi.js';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR,
  environment: 'production',
};

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
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <Provider store={store}>
            <I18nextProvider i18n={i18Instance}>
              <ApiContext.Provider value={socketApi}>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </ApiContext.Provider>
            </I18nextProvider>
          </Provider>
        </ErrorBoundary>
      </RollbarProvider>

    ));
};

export default init;
