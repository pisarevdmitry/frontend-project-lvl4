import React, { useCallback } from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getModalStatus } from '../../selectors';
import { closeModal } from '../../actions';
import AddChannel from '../AddChannel';
import RenameChannel from '../RenameChannel';
import DeleteChannel from '../DeleteChannel';

const modalTypeMapping = {
  addChannel: {
    headerText: 'chat.addChannel',
    component: AddChannel,
  },
  renameChannel: {
    headerText: 'chat.renameChannel',
    component: RenameChannel,
  },
  deleteChannel: {
    headerText: 'chat.deleteChannel',
    component: DeleteChannel,
  },
};

const Modal = () => {
  const { isOpened, type } = useSelector(getModalStatus);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleClose = useCallback(
    () => dispatch(closeModal()),
    [dispatch],
  );
  const modalData = modalTypeMapping[type];
  return (
    <BootstrapModal centered show={isOpened} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{t(modalData?.headerText)}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {modalData?.component && <modalData.component close={handleClose} />}
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default Modal;
