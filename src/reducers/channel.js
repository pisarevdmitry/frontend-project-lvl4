import { createSlice } from '@reduxjs/toolkit';
import {
  loadData,
  changeChannel,
  addChannel,
  renameChannel,
  deleteChannel,
} from '../actions/index.js';

const channelSlice = createSlice({
  name: 'channelsInfo',
  initialState: { channels: null, loaded: false, currentChannelId: null },
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(loadData.fulfilled, (state, { payload }) => {
      const newState = { ...state };
      newState.channels = payload.channels;
      newState.loaded = true;
      newState.currentChannelId = payload.currentChannelId;
      return newState;
    });
    buider.addCase(changeChannel, (state, { payload }) => (
      { ...state, currentChannelId: payload.id }
    ));
    buider.addCase(addChannel, (state, { payload }) => {
      const newState = { ...state };
      newState.channels = [...state.channels, payload.channel];
      newState.currentChannelId = payload.channel.id;
      return newState;
    });
    buider.addCase(renameChannel, (state, { payload }) => {
      const renamedChannel = state.channels.find(({ id }) => id === payload.channel.id);
      renamedChannel.name = payload.channel.name;
    });
    buider.addCase(deleteChannel, (state, { payload }) => {
      const newState = { ...state };
      newState.channels = state.channels.filter((channel) => channel.id !== payload.id);
      const defaultChannel = newState.channels.find(({ name }) => name === 'general');
      newState.currentChannelId = defaultChannel.id;
      return newState;
    });
  },
});

export default channelSlice.reducer;
