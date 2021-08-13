import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channel.js';

const store = configureStore({
  reducer: {
    channelsInfo: channelsReducer,
  },
});

export default store;
