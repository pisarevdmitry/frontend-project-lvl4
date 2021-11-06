/* eslint-disable functional/no-let, functional/no-this-expression */
import store, { actions } from './slices/index.js';

const TIMER = 5000;

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

const PromisifySocket = (fn) => (...args) => new Promise((resolve, reject) => {
  store.dispatch(actions.startProccessing());
  const onSuccess = () => {
    store.dispatch(actions.finishProccessing());
    resolve();
  };
  const onTimeoutExpire = () => {
    store.dispatch(actions.finishProccessing());
    reject();
  };
  fn(...args, withTimeout(onSuccess, onTimeoutExpire, TIMER));
});

const buildtSocketApi = (socketClient) => {
  socketClient.on('disconnect', () => store.dispatch(actions.lostConnection()));
  socketClient.on('reconnect', () => store.dispatch(actions.reconnect()));
  return {
    subscribe: () => {
      socketClient.on('newMessage', (message) => store.dispatch(actions.addMessage({ message })));
      socketClient.on('newChannel', (channel) => store.dispatch(actions.addChannel({ channel })));
      socketClient.on('renameChannel', (channel) => store.dispatch(actions.renameChannel({ channel })));
      socketClient.on('removeChannel', ({ id }) => store.dispatch(actions.deleteChannel({ id })));
    },
    sendMessage: PromisifySocket((...args) => socketClient.emit('newMessage', ...args)),
    addChannel: PromisifySocket((...args) => socketClient.emit('newChannel', ...args)),
    deleteChannel: PromisifySocket((...args) => socketClient.emit('removeChannel', ...args)),
    renameChannel: PromisifySocket((...args) => socketClient.emit('renameChannel', ...args)),
    unsubscribe: () => {
      socketClient.removeAllListeners('newMessage');
      socketClient.removeAllListeners('newChannel');
      socketClient.removeAllListeners('renameChannel');
      socketClient.removeAllListeners('removeChannel');
    },
  };
};

export default buildtSocketApi;
