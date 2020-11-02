import React from 'react';

import { Input as ChakraInput } from '@chakra-ui/core';

import { useColorMode } from '../../../context/colorModeProvider';

function Input({ formRef, name, ...rest }) {
  const { currentColor } = useColorMode();
  return (
    <ChakraInput
      name={name}
      ref={formRef}
      color='text'
      borderColor='secondaryText'
      errorBorderColor='red.500'
      focusBorderColor={`${currentColor}.100`}
      {...rest}
    />
  );
}

export default Input;
