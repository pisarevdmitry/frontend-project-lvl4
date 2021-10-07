import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import initTranslation from './init18n.js';
import { SocketContext } from './context.js';
import store from './reducers';
import App from './App.jsx';

const initSocketApi = (socketClient) => ({
  subscribe: (eventName, cb) => socketClient.on(eventName, cb),
  emit: (eventName, data = {}, onSuccess) => socketClient.emit(eventName, data, onSuccess),
});
const init = (socketClient = io()) => {
  initTranslation();
  const socketApi = initSocketApi(socketClient);
  return (
    <Provider store={store}>
      <SocketContext.Provider value={socketApi}>
        <App />
      </SocketContext.Provider>
    </Provider>
  );
};

export default init;
