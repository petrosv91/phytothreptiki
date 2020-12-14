import React from 'react';

import { Input as ChakraInput } from '@chakra-ui/react';

import { useColorMode } from '../../../context/colorModeProvider';

function Input({ formRef, name, ...rest }) {
  const { currentColor } = useColorMode();
  return (
    <ChakraInput
      name={name}
      ref={formRef}
      fontWeight='500'
      color='text'
      borderRadius='sm'
      borderColor='secondaryText'
      errorBorderColor='red.500'
      focusBorderColor={`${currentColor}AA`}
      _hover={{ borderColor: 'text' }}
      {...rest}
    />
  );
}

export default Input;
