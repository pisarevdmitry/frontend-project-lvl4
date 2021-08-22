import React, { useEffect, useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import {
  getChannelsInfo,
  getLoadingStatus,
  getCurrentChannelMessages,
  getCurrentChannelName,
} from 'selectors';
import UserContext from 'context';
import { loadData, addMessage as addMessageAction } from 'actions';
import ChannelsList from 'components/ChannelsList';
import MessagesBox from 'components/MessagesBox';
import AddMessage from 'components/AddMessage';

const socket = io(window.location.host, { autoConnect: false });

const Chat = () => {
  const { user } = useContext(UserContext);
  const { channels, currentChannelId } = useSelector(getChannelsInfo);
  const loaded = useSelector(getLoadingStatus);
  const currentChannelName = useSelector(getCurrentChannelName);
  const messages = useSelector(getCurrentChannelMessages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData(user.token));
  }, []);
  useEffect(() => {
    socket.connect();
    socket.on('newMessage', (message) => dispatch(addMessageAction({ message })));
    return () => {
      socket.disconnect();
    };
  }, []);

  const emitMessage = useCallback(
    ({ message }, actions) => {
      socket.emit('newMessage', { channelId: currentChannelId, userName: user.userName, body: message }, () => actions.resetForm());
    },
    [currentChannelId, user],
  );

  if (!loaded) return null;
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
          </div>
          <ChannelsList channels={channels} current={currentChannelId} />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>{`# ${currentChannelName}`}</b>
              </p>
              <span className="text-muted">{`${messages.length} сообщения`}</span>
            </div>
            <MessagesBox messages={messages} />
            <div className="mt-auto px-5 py-3">
              <AddMessage onSubmit={emitMessage} />
            </div>
          </div>
        </div>

        <div className="d-flex flex-column h-100" />
      </div>
    </div>
  );
};

export default Chat;
