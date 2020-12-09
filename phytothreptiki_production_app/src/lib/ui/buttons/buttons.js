import React from 'react';

import { Button } from '@chakra-ui/react';

import { useColorMode } from '../../../context/colorModeProvider';

function Primary({ children, ...rest }) {
  const { currentColor } = useColorMode();
  return (
    <Button
      border={0}
      variant='solid'
      color='colorText'
      cursor='pointer'
      bg={`${currentColor}.400`}
      _hover={{ color: 'colorText', bg: `${currentColor}.500` }}
      {...rest}
    >
      {children}
    </Button>
  );
}

function Secondary({ children, ...rest }) {
  return (
    <Button
      fontSize='md'
      cursor='pointer'
      color='secondaryText'
      variant='outline'
      _hover={{ color: 'text', colorScheme: 'text' }}
      {...rest}
    >
      {children}
    </Button>
  );
}

function Tertiary({ children, ...rest }) {
  return (
    <Button
      fontSize='md'
      cursor='pointer'
      variant='link'
      color='secondaryText'
      _hover={{ color: 'text' }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export { Primary, Secondary, Tertiary };
