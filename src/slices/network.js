/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { loadData } from './channel.js';

const networkSlice = createSlice({
  name: 'networkInfo',
  initialState: { status: 'ready', socketConnection: 'working' },
  reducers: {
    startProccessing: (state) => {
      state.status = 'proccessing';
    },
    finishProccessing: (state) => {
      state.status = 'ready';
    },
    lostConnection: (state) => {
      state.socketConnection = 'lost';
    },
    reconnect: (state) => {
      state.socketConnection = 'working';
    },
  },
  extraReducers: (buider) => {
    buider.addCase(loadData.fulfilled, (state) => {
      state.status = 'ready';
    });
    buider.addCase(loadData.pending, (state) => {
      state.status = 'proccessing';
    });
  },
});

export const {
  startProccessing,
  finishProccessing,
  lostConnection,
  reconnect,
} = networkSlice.actions;

export default networkSlice.reducer;
