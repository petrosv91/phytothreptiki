import React from 'react';

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
} from '@chakra-ui/core';

const dark = { bg: 'gray.700', color: 'white' };
const light = { bg: 'gray.300', color: 'black' };

function Modal({ children, isOpen, onClose, header, darkMode }) {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent py={8} minH='50vh' borderRadius='md' bg={darkMode ? dark.bg : light.bg}>
          <ModalHeader textAlign='center' color={darkMode ? dark.color : light.color}>
            {header}
          </ModalHeader>
          <ModalCloseButton color={darkMode ? dark.color : light.color} />
          {children}
        </ModalContent>
      </ModalOverlay>
    </ChakraModal>
  );
}

export default Modal;
