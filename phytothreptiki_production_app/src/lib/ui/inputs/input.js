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
      errorBorderColor='red.500'
      focusBorderColor='teal.100'
      {...rest}
    />
  );
}

export default Input;
