import React from 'react';

import { Select as ChakraSelect } from '@chakra-ui/react';

import { useColorMode } from '../../../context/colorModeProvider';

function Select({ children, name, formRef, ...rest }) {
  const { currentColor } = useColorMode();
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
      focusBorderColor={`${currentColor}AA`}
      _hover={{ borderColor: 'text' }}
      {...rest}
    >
      {children}
    </ChakraSelect>
  );
}

export default Select;
