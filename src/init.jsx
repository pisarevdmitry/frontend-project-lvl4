import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import initTranslation from './init18n.js';
import { SocketContext } from './context.js';
import store, { actions } from './reducers';
import {
  startProccessing,
  finishProccessing,
} from './actions';
import App from './App.jsx';
import withTimeout from './timeout';
import TIMER from './constans.js';

const onTimeoutExpire = () => store.dispatch(finishProccessing());
const handleSuccess = (cb) => () => {
  store.dispatch(finishProccessing());
  cb();
};
const initSocketApi = (socketClient) => ({
  subscribe: () => {
    socketClient.on('newMessage', (message) => store.dispatch(actions.addMessage({ message })));
    socketClient.on('newChannel', (channel) => store.dispatch(actions.addChannel({ channel })));
    socketClient.on('renameChannel', (channel) => store.dispatch(actions.renameChannel({ channel })));
    socketClient.on('removeChannel', ({ id }) => store.dispatch(actions.deleteChannel({ id })));
  },
  sendMessage: (data, onSuccess) => {
    store.dispatch(startProccessing());
    const successCb = handleSuccess(onSuccess);
    socketClient.emit('newMessage', data, withTimeout(successCb, onTimeoutExpire, TIMER));
  },
  addChannel: (data, onSuccess) => {
    store.dispatch(startProccessing());
    const successCb = handleSuccess(onSuccess);
    socketClient.emit('newChannel', data, withTimeout(successCb, onTimeoutExpire, TIMER));
  },
  deleteChannel: (data, onSuccess) => {
    store.dispatch(startProccessing());
    const successCb = handleSuccess(onSuccess);
    socketClient.emit('removeChannel', data, withTimeout(successCb, onTimeoutExpire, TIMER));
  },
  renameChannel: (data, onSuccess) => {
    store.dispatch(startProccessing());
    const successCb = handleSuccess(onSuccess);
    socketClient.emit('renameChannel', data, withTimeout(successCb, onTimeoutExpire, TIMER));
  },
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
