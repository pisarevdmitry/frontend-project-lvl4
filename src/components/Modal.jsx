import React from 'react';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import AddChannel from './AddChannel';
import RenameChannel from './RenameChannel';
import DeleteChannel from './DeleteChannel';
import { getModalData } from '../selectors';
import { actions } from '../slices';

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
  const { t } = useTranslation();
  const { isOpened, type, extraData } = useSelector(getModalData);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(actions.closeModal());
  const modalData = modalTypeMapping[type];
  return (
    <BootstrapModal centered show={isOpened} onHide={closeModal}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{t(modalData?.headerText)}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {modalData?.component && <modalData.component close={closeModal} extraData={extraData} />}
      </BootstrapModal.Body>
    </BootstrapModal>
  );
};

export default React.memo(Modal);
