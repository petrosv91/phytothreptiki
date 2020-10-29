import React from 'react';

import { Input as ChakraInput } from '@chakra-ui/core';

import { useColorMode } from '../../../context/colorModeProvider';

function Input({ onChange, formRef, placeholder, name, ...rest }) {
  const { currentColor } = useColorMode();
  return (
    <ChakraInput
      name={name}
      ref={formRef}
      onChange={onChange}
      placeholder={placeholder}
      color='text'
      fontSize='md'
      fontWeight='500'
      autoComplete='off'
      borderColor='secondaryText'
      errorBorderColor='red.500'
      focusBorderColor={`${currentColor}.100`}
      {...rest}
    />
  );
}

export default Input;
