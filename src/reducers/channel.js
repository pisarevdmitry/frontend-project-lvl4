import { createSlice } from '@reduxjs/toolkit';
import { loadData } from 'actions';

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
  },
});

export default channelSlice.reducer;
