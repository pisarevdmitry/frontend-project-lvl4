/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { loadData } from './channel.js';

const networkSlice = createSlice({
  name: 'networkInfo',
  initialState: { status: 'ready' },
  reducers: {
    startProccessing: (state) => {
      state.status = 'proccessing';
    },
    finishProccessing: (state) => {
      state.status = 'ready';
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

export const { startProccessing, finishProccessing } = networkSlice.actions;

export default networkSlice.reducer;
