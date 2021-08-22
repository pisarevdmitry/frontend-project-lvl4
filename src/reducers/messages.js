import { createSlice } from '@reduxjs/toolkit';
import { loadData, addMessage } from 'actions';

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState: { messages: [] },
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(loadData.fulfilled, (state, { payload }) => {
      state.messages = payload.messages;
    });
    buider.addCase(addMessage, (state, { payload }) => {
      state.messages.push(payload.message);
    });
  },
});

export default messagesSlice.reducer;
