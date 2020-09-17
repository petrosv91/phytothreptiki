import React from 'react';

import { Select as ChakraSelect } from '@chakra-ui/core';

function Select({ formRef, children, ...rest }) {
  return (
    <ChakraSelect ref={formRef} cursor='pointer' border={0} color='white' bg='gray.800' {...rest}>
      {children}
    </ChakraSelect>
  );
}

export default Select;
