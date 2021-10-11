import { configureStore } from '@reduxjs/toolkit';
import channelsReducer, {
  loadData, changeChannel, addChannel, renameChannel, deleteChannel,
} from './channel.js';
import messagesReducer, { addMessage } from './messages.js';
import loadingReducer from './loading.js';
import modalReducer, { openModal, closeModal } from './modal.js';
import networkReducer, {
  startProccessing, finishProccessing, lostConnection, reconnect,
} from './network.js';

const store = configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
    loadingInfo: loadingReducer,
    modal: modalReducer,
    network: networkReducer,
  },
});

export const actions = {
  loadData,
  addMessage,
  changeChannel,
  addChannel,
  renameChannel,
  deleteChannel,
  openModal,
  closeModal,
  startProccessing,
  finishProccessing,
  lostConnection,
  reconnect,
};

export default store;
