import React from 'react';

import { Select as ChakraSelect } from '@chakra-ui/react';

function Select({ children, name, formRef, ...rest }) {
  return (
    <ChakraSelect
      name={name}
      ref={formRef}
      fontWeight='500'
      color='text'
      cursor='pointer'
      borderRadius='sm'
      borderColor='secondaryText'
      errorBorderColor='red.500'
      focusBorderColor='special.100'
      _hover={{ borderColor: 'text' }}
      {...rest}
    >
      {children}
    </ChakraSelect>
  );
}

export default Select;
