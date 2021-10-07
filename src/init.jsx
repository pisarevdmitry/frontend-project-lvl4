import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import initTranslation from './init18n.js';
import { SocketContext } from './context.js';
import store from './reducers';
import {
  addMessage,
  addChannel,
  renameChannel,
  deleteChannel,
} from './actions';
import App from './App.jsx';

const initSocketApi = (socketClient) => ({
  subscribe: () => {
    socketClient.on('newMessage', (message) => store.dispatch(addMessage({ message })));
    socketClient.on('newChannel', (channel) => store.dispatch(addChannel({ channel })));
    socketClient.on('renameChannel', (channel) => store.dispatch(renameChannel({ channel })));
    socketClient.on('removeChannel', ({ id }) => store.dispatch(deleteChannel({ id })));
  },
  sendMessage: (data, onSuccess) => socketClient.emit('newMessage', data, onSuccess),
  addChannel: (data, onSuccess) => socketClient.emit('newChannel', data, onSuccess),
  deleteChannel: (data, onSuccess) => socketClient.emit('removeChannel', data, onSuccess),
  renameChannel: (data, onSuccess) => socketClient.emit('renameChannel', data, onSuccess),
  unsubscribe: () => {
    socketClient.removeAllListeners();
  },
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
