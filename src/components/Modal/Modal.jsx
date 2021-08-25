import React, { useCallback } from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStatus } from 'selectors';
import { closeModal } from 'actions';
import AddChannel from 'components/AddChannel';
import RenameChannel from 'components/RenameChannel';
import DeleteChannel from 'components/DeleteChannel';

const modalTypeMapping = {
  addChannel: {
    headerText: 'Добавить канал',
    component: AddChannel,
  },
  renameChannel: {
    headerText: 'Переименовать канал',
    component: RenameChannel,
  },
  deleteChannel: {
    headerText: 'Удалить канал',
    component: DeleteChannel,
  },
};

const Modal = () => {
  const { isOpened, type } = useSelector(getModalStatus);
  const dispatch = useDispatch();
  const handleClose = useCallback(
    () => dispatch(closeModal()),
    [],
  );
  const modalData = modalTypeMapping[type];
  return (
    <BootstrapModal centered show={isOpened} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{modalData?.headerText}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {modalData?.component && <modalData.component close={handleClose} />}
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;
