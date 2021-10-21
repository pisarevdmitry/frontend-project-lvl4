import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import initTranslation from './init18n.js';
import { SocketContext } from './context.js';
import store from './slices';
import App from './App.jsx';
import buildtSocketApi from './buildSocketApi.js';

const init = (socketClient = io()) => {
  initTranslation();
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
