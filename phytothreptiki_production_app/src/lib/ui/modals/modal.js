import React from 'react';

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
} from '@chakra-ui/core';

const dark = { bg: 'gray.700', color: 'white' };
const light = { bg: 'gray.200', color: 'black' };

function Modal({ children, isOpen, onClose, header, darkMode, ...rest }) {
  return (
    <ChakraModal blockScrollOnMount isOpen={isOpen} onClose={onClose} {...rest}>
      <ModalOverlay />
      <ModalContent py={4} minH='70vh' borderRadius='md' bg={darkMode ? dark.bg : light.bg}>
        <ModalHeader textAlign='center' color={darkMode ? dark.color : light.color}>
          {header}
        </ModalHeader>
        <ModalCloseButton color={darkMode ? dark.color : light.color} />
        {children}
      </ModalContent>
    </ChakraModal>
  );
}

export default Modal;
