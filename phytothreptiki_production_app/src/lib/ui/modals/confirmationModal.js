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

export default function ConfirmationModal({
  onClose,
  isOpen,
  message,
  callback,
  isLoading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={isLoading ? () => {} : onClose}>
      <ModalOverlay>
        <ModalContent borderRadius='md' bg='gray.300' py={4}>
          <ModalHeader>Επιβεβαίωση ενέργειας</ModalHeader>
          <ModalCloseButton tabIndex={-1} />
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <Button mr={3} colorScheme='teal' onClick={callback} isLoading={isLoading}>
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
