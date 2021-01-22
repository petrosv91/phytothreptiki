import React from 'react';

import { Input as ChakraInput } from '@chakra-ui/react';

function Input({ formRef, name, ...rest }) {
  return (
    <ChakraInput
      name={name}
      ref={formRef}
      fontWeight='500'
      color='text'
      borderRadius='sm'
      borderColor='secondaryText'
      errorBorderColor='red.500'
      focusBorderColor='special.100'
      _hover={{ borderColor: 'text' }}
      {...rest}
    />
  );
}

export default Input;
