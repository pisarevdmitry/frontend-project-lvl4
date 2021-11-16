import React, {
  useEffect, useContext, useMemo,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import {
  getChannelsInfo,
  getCurrentChannelMessages,
  isProccessed as isProccessedSelector,
  isConnectionLost as isConnectionLostSelector,
  getChannelById,
  getModalData,
} from '../selectors';
import { ApiContext, AuthContext } from '../context';
import { actions } from '../slices';
import ChannelsList from './ChannelsList';
import MessagesBox from './MessagesBox';
import AddMessage from './AddMessage';
import Loader from './Loader';
import Modal from './Modal';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { subscribe, sendMessage, unsubscribe } = useContext(ApiContext);
  const { t } = useTranslation();
  const { channels, currentChannelId, loaded } = useSelector(getChannelsInfo);
  const { isOpened } = useSelector(getModalData);
  const getCurrentChannel = useMemo(() => getChannelById(currentChannelId), [currentChannelId]);
  const currentChannel = useSelector(getCurrentChannel);
  const messages = useSelector(getCurrentChannelMessages);
  const isProccessed = useSelector(isProccessedSelector);
  const isConnectionLost = useSelector(isConnectionLostSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.loadData(user.token));
  }, [dispatch, user.token]);
  useEffect(() => {
    subscribe();
    return () => {
      unsubscribe();
    };
  }, [dispatch, subscribe, unsubscribe]);
  const addChannel = () => dispatch(actions.openModal({ type: 'addChannel' }));
  const renameChannel = (id) => dispatch(actions.openModal({ type: 'renameChannel', extra: { channelId: id } }));
  const deleteChannel = (id) => dispatch(actions.openModal({ type: 'deleteChannel', extra: { channelId: id } }));
  const addMessage = ({ message }, cb) => {
    sendMessage({ channelId: currentChannelId, userName: user.userName, body: message })
      .then(() => {
        cb();
      });
  };
  const changeChannel = (id) => {
    if (id === currentChannelId) return;
    dispatch(actions.changeChannel({ id }));
  };
  if (!loaded) return <Loader />;
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow" aria-hidden={isOpened}>
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>{t('chat.channels')}</span>
            <Button disabled={isProccessed} onClick={addChannel} type="button" className="p-0 text-primary " variant="group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </Button>
          </div>
          <ChannelsList
            changeChannel={changeChannel}
            channels={channels}
            current={currentChannelId}
            onRename={renameChannel}
            onDelete={deleteChannel}
            isProccessed={isProccessed}
          />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>{`# ${currentChannel?.name}`}</b>
              </p>
              <span className="text-muted">{t('chat.message', { count: messages.length })}</span>
            </div>
            <MessagesBox messages={messages} />
            <div className="mt-auto px-5 py-3">
              <AddMessage
                isProccessed={isProccessed}
                currentChannel={currentChannelId}
                onSubmit={addMessage}
              />
              { isConnectionLost && <div className="text-danger">{t('errors.connectionLost')}</div>}
            </div>
            <Modal />
          </div>
        </div>

        <div className="d-flex flex-column h-100" />
      </div>
    </div>
  );
};

export default Chat;
