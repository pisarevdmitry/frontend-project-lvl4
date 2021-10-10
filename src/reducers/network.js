/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { startProccessing, finishProccessing } from '../actions/index.js';
import { loadData } from './channel.js';

const networkSlice = createSlice({
  name: 'networkInfo',
  initialState: { status: 'ready' },
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(loadData.fulfilled, (state) => {
      state.status = 'ready';
    });
    buider.addCase(loadData.pending, (state) => {
      state.status = 'proccessing';
    });
    buider.addCase(startProccessing, (state) => {
      state.status = 'proccessing';
    });
    buider.addCase(finishProccessing, (state) => {
      state.status = 'ready';
    });
  },
});

export default networkSlice.reducer;
