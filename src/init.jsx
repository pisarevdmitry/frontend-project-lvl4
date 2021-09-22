import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import { io } from 'socket.io-client';
import initTranslation from './init18n.js';
import store from './reducers';
import App from './App.jsx';

const init = (socketClient = io()) => {
  initTranslation();
  return <App store={store} socket={socketClient} />;
};

export default init;
