import React from 'react';

import { Input as ChakraInput } from '@chakra-ui/core';

function Input({ onChange, formRef, placeholder, name, ...rest }) {
  return (
    <ChakraInput
      bg='white'
      name={name}
      ref={formRef}
      onChange={onChange}
      placeholder={placeholder}
      color='gray.500'
      fontSize='md'
      fontWeight='500'
      autoComplete='off'
      borderColor='gray.300'
      errorBorderColor='red.500'
      focusBorderColor='teal.200'
      _hover={{ borderColor: 'gray.400' }}
      {...rest}
    />
  );
}

export default Input;
