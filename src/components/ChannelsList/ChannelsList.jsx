import React from 'react';
import Channel from 'components/Channel';

const ChannelsList = ({
  channels, current, changeChannel, onRename, onDelete,
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
      />
    ))}
  </ul>
);

export default ChannelsList;
