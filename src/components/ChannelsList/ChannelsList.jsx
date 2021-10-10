import React from 'react';
import Channel from '../Channel';

const ChannelsList = ({
  channels, current, changeChannel, onRename, onDelete, networkStatus,
}) => (
  <ul className="nav flex-column nav-pills nav-fill px-2">
    {channels.map(({ name, id, removable }) => (
      <Channel
        key={id}
        removable={removable}
        name={name}
        id={id}
        current={current}
        changeChannel={changeChannel}
        onRename={onRename}
        onDelete={onDelete}
        networkStatus={networkStatus}
      />
    ))}
  </ul>
);

export default ChannelsList;
