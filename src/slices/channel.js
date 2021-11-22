/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import routes from '../routes.js';

export const loadData = createAsyncThunk('fetchData', async ({ token, onReject = _.noop }) => {
  const route = routes.getData();
  return axios.get(route, { headers: { Authorization: `Bearer ${token}` } })
    .then((responce) => responce.data)
    .catch(() => {
      onReject();
      return Promise.reject();
    });
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
