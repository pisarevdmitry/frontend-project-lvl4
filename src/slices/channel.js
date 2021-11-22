/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

export const loadData = createAsyncThunk('fetchData', async ({ token, onReject }) => {
  const route = routes.getData();
  try {
    const responce = await axios.get(route, { headers: { Authorization: `Bearer ${token}` } });
    return responce.data;
  } catch {
    onReject();
    throw new Error();
  }
});

const channelSlice = createSlice({
  name: 'channelsInfo',
  initialState: {
    channels: null, loaded: false, currentChannelId: null,
  },
  reducers: {
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload.id;
    },
    addChannel: (state, { payload }) => {
      state.channels = [...state.channels, payload.channel];
      state.currentChannelId = payload.channel.id;
    },
    renameChannel: (state, { payload }) => {
      const renamedChannel = state.channels.find(({ id }) => id === payload.channel.id);
      renamedChannel.name = payload.channel.name;
    },
    deleteChannel: (state, { payload }) => {
      state.channels = state.channels.filter((channel) => channel.id !== payload.id);
      const defaultChannel = state.channels.find(({ name }) => name.toLowerCase() === 'general');
      state.currentChannelId = defaultChannel.id;
    },
  },
  extraReducers: (buider) => {
    buider.addCase(loadData.fulfilled, (state, { payload }) => {
      state.channels = payload.channels;
      state.loaded = true;
      state.currentChannelId = payload.currentChannelId;
    });
  },
});

export const {
  changeChannel, addChannel, renameChannel, deleteChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
