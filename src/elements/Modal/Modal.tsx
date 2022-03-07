import React from 'react';
import { IoClose } from 'react-icons/io5';
import Modal from 'react-modal';
import './Modal.scss';

Modal.setAppElement('#app');

const ModalWrap = ({ modalOpen, setModalOpen, children, className }) => {
  const combinedClasslassName = ['react-modal', className].join(' ');
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      shouldCloseOnOverlayClick
      className={combinedClasslassName}
      overlayClassName="react-modal-overlay"
      closeTimeoutMS={400}
    >
      <IoClose onClick={() => setModalOpen(false)} />
      {children}
    </Modal>
  );
};

export default ModalWrap;
