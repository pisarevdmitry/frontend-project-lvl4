import { createSlice } from '@reduxjs/toolkit';
import {
  loadData,
  changeChannel,
  addChannel,
  renameChannel,
  deleteChannel,
} from 'actions';

const channelSlice = createSlice({
  name: 'channelsInfo',
  initialState: { channels: null, loaded: false, currentChannelId: null },
  reducers: {},
  extraReducers: (buider) => {
    buider.addCase(loadData.fulfilled, (state, { payload }) => {
      state.channels = payload.channels;
      state.loaded = true;
      state.currentChannelId = payload.currentChannelId;
    });
    buider.addCase(changeChannel, (state, { payload }) => {
      state.currentChannelId = payload.id;
    });
    buider.addCase(addChannel, (state, { payload }) => {
      state.channels.push(payload.channel);
      state.currentChannelId = payload.channel.id;
    });
    buider.addCase(renameChannel, (state, { payload }) => {
      const renamedChannel = state.channels.find(({ id }) => id === payload.channel.id);
      renamedChannel.name = payload.channel.name;
    });
    buider.addCase(deleteChannel, (state, { payload }) => {
      state.channels = state.channels.filter((channel) => channel.id !== payload.id);
      const defaultChannel = state.channels.find(({ name }) => name === 'general');
      state.currentChannelId = defaultChannel.id;
    });
  },
});

export default channelSlice.reducer;
