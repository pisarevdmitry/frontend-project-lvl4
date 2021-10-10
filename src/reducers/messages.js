/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { loadData, deleteChannel } from './channel.js';

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: { messages: [] },
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload.message);
    },
  },
  extraReducers: (buider) => {
    buider.addCase(loadData.fulfilled, (state, { payload }) => {
      state.messages = payload.messages;
    });
    buider.addCase(deleteChannel, (state, { payload }) => {
      state.messages = state.messages.filter(({ channelId }) => channelId !== payload.id);
    });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
