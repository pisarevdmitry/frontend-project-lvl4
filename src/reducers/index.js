import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channel.js';
import messagesReducer from './messages.js';
import loadingReducer from './loading.js';
import modalReducer from './modal.js';

const store = configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
    loadingInfo: loadingReducer,
    modal: modalReducer,
  },
});

export default store;
