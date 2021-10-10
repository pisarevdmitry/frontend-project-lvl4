import { configureStore } from '@reduxjs/toolkit';
import channelsReducer, {
  loadData, changeChannel, addChannel, renameChannel, deleteChannel,
} from './channel.js';
import messagesReducer, { addMessage } from './messages.js';
import loadingReducer from './loading.js';
import modalReducer from './modal.js';
import networkReducer from './network.js';

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
};

export default store;
