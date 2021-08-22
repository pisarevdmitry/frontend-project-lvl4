import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channel.js';
import messagesReducer from './messages.js';
import loadingReducer from './loading.js';

const store = configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
    loadingInfo: loadingReducer,
  },
});

export default store;
