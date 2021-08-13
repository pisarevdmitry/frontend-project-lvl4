/* eslint-disable arrow-body-style */
import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getChannelsInfo } from 'selectors';
import UserContext from 'context';
import { loadData } from 'actions';
import ChannelsList from 'components/ChannelsList';

const Chat = () => {
  const { user } = useContext(UserContext);
  const { loaded, channels, currentChannelId } = useSelector(getChannelsInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadData(user.token));
  }, []);
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
        <div className="d-flex flex-column h-100" />
      </div>
    </div>
  );
};

export default Chat;
