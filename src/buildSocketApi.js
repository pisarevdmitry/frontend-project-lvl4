import store, { actions } from './reducers/index.js';
import withTimeout from './timeout.js';

const onTimeoutExpire = () => store.dispatch(actions.finishProccessing());
const handleSuccess = (cb) => () => {
  store.dispatch(actions.finishProccessing());
  cb();
};

const TIMER = 5000;

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
    sendMessage: (data, onSuccess) => {
      store.dispatch(actions.startProccessing());
      const successCb = handleSuccess(onSuccess);
      socketClient.emit('newMessage', data, withTimeout(successCb, onTimeoutExpire, TIMER));
    },
    addChannel: (data, onSuccess) => {
      store.dispatch(actions.startProccessing());
      const successCb = handleSuccess(onSuccess);
      socketClient.emit('newChannel', data, withTimeout(successCb, onTimeoutExpire, TIMER));
    },
    deleteChannel: (data, onSuccess) => {
      store.dispatch(actions.startProccessing());
      const successCb = handleSuccess(onSuccess);
      socketClient.emit('removeChannel', data, withTimeout(successCb, onTimeoutExpire, TIMER));
    },
    renameChannel: (data, onSuccess) => {
      store.dispatch(actions.startProccessing());
      const successCb = handleSuccess(onSuccess);
      socketClient.emit('renameChannel', data, withTimeout(successCb, onTimeoutExpire, TIMER));
    },
    unsubscribe: () => {
      socketClient.removeAllListeners();
    },
  };
};

export default buildtSocketApi;
