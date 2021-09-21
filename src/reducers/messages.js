import { createSlice } from '@reduxjs/toolkit';
import { loadData, addMessage, deleteChannel } from '../actions/index.js';

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: { messages: [] },
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(loadData.fulfilled, (state, { payload }) => (
      { ...state, messages: payload.messages }
    ));
    buider.addCase(addMessage, (state, { payload }) => (
      { ...state, messages: [...state.messages, payload.message] }
    ));
    buider.addCase(deleteChannel, (state, { payload }) => {
      const filtered = state.messages.filter(({ channelId }) => channelId !== payload.id);
      return { ...state, messages: filtered };
    });
  },
});

export default messagesSlice.reducer;
