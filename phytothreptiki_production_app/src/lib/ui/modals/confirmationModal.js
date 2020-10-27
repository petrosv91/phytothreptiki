import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/core';

function ConfirmationModal({ isOpen, onClose, message, onConfirm, isLoading = false }) {
  return (
    <Modal isOpen={isOpen} onClose={isLoading ? () => {} : onClose}>
      <ModalOverlay>
        <ModalContent py={4} bg='gray.300' borderRadius='md'>
          <ModalHeader>Επιβεβαίωση ενέργειας</ModalHeader>
          <ModalCloseButton tabIndex={-1} />
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <Button mr={3} colorScheme='teal' onClick={onConfirm} isLoading={isLoading}>
              Συνέχεια
            </Button>
            <Button variant='ghost' onClick={onClose} pointerEvents={isLoading ? 'none' : 'auto'}>
              Άκυρο
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}

export default ConfirmationModal;
