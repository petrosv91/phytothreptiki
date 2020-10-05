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

export default function ConfirmationModal({ onClose, isOpen, message, callback }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent borderRadius='md' bg='gray.200' py={4}>
            <ModalHeader>Επιβεβαίωση ενέργειας</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{message}</ModalBody>
            <ModalFooter>
              <Button colorScheme='teal' mr={3} onClick={callback}>
                Συνέχεια
              </Button>
              <Button variant='ghost' onClick={onClose}>
                Άκυρο
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
}
