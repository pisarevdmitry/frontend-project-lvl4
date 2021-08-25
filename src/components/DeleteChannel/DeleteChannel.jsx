import React, { useState, useCallback, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getExtraData } from 'selectors';
import { SocketContext } from 'context';

const DeleteChannel = ({ close }) => {
  const { channelId } = useSelector(getExtraData);
  const { socket } = useContext(SocketContext);
  const [disabled, setDisabled] = useState(false);
  const deleteChannel = useCallback(
    () => {
      setDisabled(true);
      socket.emit('removeChannel', { id: channelId }, () => close());
    },
    [channelId],
  );
  return (
    <>
      <p className="lead">Уверены?</p>
      <div className="d-flex justify-content-end">
        <Button disabled={disabled} variant="secondary" onClick={close} className="me-2">Отменить</Button>
        <Button disabled={disabled} onClick={deleteChannel}>Удалить</Button>
      </div>
    </>
  );
};

export default DeleteChannel;
