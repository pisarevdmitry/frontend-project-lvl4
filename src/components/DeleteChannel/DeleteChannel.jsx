import React, { useState, useCallback, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getExtraData } from '../../selectors';
import { SocketContext } from '../../context.js';

const DeleteChannel = ({ close }) => {
  const { channelId } = useSelector(getExtraData);
  const { socket } = useContext(SocketContext);
  const { t } = useTranslation();
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
      <p className="lead">{t('sure')}</p>
      <div className="d-flex justify-content-end">
        <Button disabled={disabled} variant="secondary" onClick={close} className="me-2">{t('buttons.cancel')}</Button>
        <Button disabled={disabled} onClick={deleteChannel}>{t('buttons.delete')}</Button>
      </div>
    </>
  );
};

export default DeleteChannel;
