/* eslint-disable functional/no-let, functional/no-this-expression */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './slices/index.js';

const TIMER = 5000;
const SocketContext = React.createContext();

const withTimeout = (onSuccess, onTimeout, timeout) => {
  let called = false;

  const timer = setTimeout(() => {
    if (called) return;
    called = true;
    onTimeout();
  }, timeout);

  return (...args) => {
    if (called) return;
    called = true;
    clearTimeout(timer);
    onSuccess.apply(this, args);
  };
};

const SocketProvider = ({ children, socketClient }) => {
  const dispatch = useDispatch();
  const PromisifySocket = (fn) => (...args) => new Promise((resolve, reject) => {
    dispatch(actions.startProccessing());
    const onSuccess = () => {
      dispatch(actions.finishProccessing());
      resolve();
    };
    const onTimeoutExpire = () => {
      dispatch(actions.finishProccessing());
      reject();
    };
    fn(...args, withTimeout(onSuccess, onTimeoutExpire, TIMER));
  });
  useEffect(() => {
    socketClient.on('disconnect', () => dispatch(actions.lostConnection()));
    socketClient.on('reconnect', () => dispatch(actions.reconnect()));
  }, []);
  const subscribe = () => {
    socketClient.on('newMessage', (message) => dispatch(actions.addMessage({ message })));
    socketClient.on('newChannel', (channel) => dispatch(actions.addChannel({ channel })));
    socketClient.on('renameChannel', (channel) => dispatch(actions.renameChannel({ channel })));
    socketClient.on('removeChannel', ({ id }) => dispatch(actions.deleteChannel({ id })));
  };
  const unsubscribe = () => {
    socketClient.removeAllListeners('newMessage');
    socketClient.removeAllListeners('newChannel');
    socketClient.removeAllListeners('renameChannel');
    socketClient.removeAllListeners('removeChannel');
  };
  const sendMessage = PromisifySocket((...args) => socketClient.emit('newMessage', ...args));
  const addChannel = PromisifySocket((...args) => socketClient.emit('newChannel', ...args));
  const deleteChannel = PromisifySocket((...args) => socketClient.emit('removeChannel', ...args));
  const renameChannel = PromisifySocket((...args) => socketClient.emit('renameChannel', ...args));
  const api = {
    subscribe, unsubscribe, sendMessage, addChannel, deleteChannel, renameChannel,
  };

  return (
    <SocketContext.Provider value={api}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
export { SocketContext };
