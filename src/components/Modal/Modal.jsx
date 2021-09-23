import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
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

const Modal = ({ isOpened, type, handleClose }) => {
  const { t } = useTranslation();
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
