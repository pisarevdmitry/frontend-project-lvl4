import { createSelector } from '@reduxjs/toolkit';
import _ from 'lodash';

export const getChannelsInfo = (state) => state.channelsInfo;
export const getLoadingStatus = (state) => state.loadingInfo.loaded;
const getChannels = (state) => state.channelsInfo.channels;
const getCurrentChannelId = (state) => state.channelsInfo.currentChannelId;
const getMessages = (state) => state.messagesInfo.messages;
export const getCurrentChannelMessages = createSelector(
  getMessages,
  getCurrentChannelId,
  (messages, channelId) => (
    messages.filter((message) => message.channelId === channelId)
  ),
);
export const getModalData = (state) => (
  { isOpened: state.modal.isOpened, type: state.modal.type, extraData: state.modal.extraData }
);

export const getChannelsNames = createSelector(
  getChannels,
  (channels) => channels.map((channel) => channel.name),
);
export const getExtraData = (state) => state.modal.extraData;
export const isProccessed = (state) => state.network.status === 'proccessing';
export const isConnectionLost = (state) => state.network.socketConnection === 'lost';
export const getChannelById = (id) => createSelector(getChannels,
  (channels) => _.find(channels, (channelItem) => channelItem.id === id));
