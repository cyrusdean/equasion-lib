import React from 'react'
import { FiX } from 'react-icons/fi'
import Modal from 'react-modal'
import './Modal.scss'

Modal.setAppElement('#app')

const ModalWrap = ({ modalOpen, setModalOpen, children, className }) => {
  const combinedClasslassName = ['react-modal', className].join(' ')
  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      shouldCloseOnOverlayClick
      className={combinedClasslassName}
      overlayClassName="react-modal-overlay"
      closeTimeoutMS={0}
    >
      <FiX onClick={() => setModalOpen(false)} />
      {children}
    </Modal>
  )
}

export default ModalWrap
