import { createSlice } from '@reduxjs/toolkit';
import { loadData, changeChannel, addChannel } from 'actions';

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
  },
});

export default channelSlice.reducer;
