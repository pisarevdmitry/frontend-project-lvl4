import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';

export const getChannelsInfo = (state) => state.channelsInfo;
export const getLoadingStatus = (state) => state.loadingInfo.loaded;
const getChannels = (state) => state.channelsInfo.channels;
const getCurrentChannel = (state) => state.channelsInfo.currentChannelId;
const getMessages = (state) => state.messagesInfo.messages;
export const getCurrentChannelMessages = createSelector(
  getMessages,
  getCurrentChannel,
  (messages, channelId) => (
    messages.filter((message) => message.channelId === channelId)
  ),
);
export const getCurrentChannelName = createSelector(
  getChannels,
  getCurrentChannel,
  (channels, id) => {
    const currentChannel = _.find(channels, (channel) => channel.id === id);
    return currentChannel?.name;
  },
);
export const getModalStatus = (state) => (
  { isOpened: state.modal.isOpened, type: state.modal.type }
);

export const getChannelsNames = createSelector(
  getChannels,
  (channels) => channels.map((channel) => channel.name),
);
