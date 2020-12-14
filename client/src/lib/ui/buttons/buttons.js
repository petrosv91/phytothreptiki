import React from 'react';

import { Button } from '@chakra-ui/react';

import { useColorMode } from '../../../context/colorModeProvider';

function Primary({ children, ...rest }) {
  const { currentColor } = useColorMode();
  return (
    <Button
      variant='solid'
      cursor='pointer'
      borderRadius='sm'
      color='colorText'
      bg={currentColor}
      _hover={{ color: 'colorText', bg: `${currentColor}DD` }}
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
      variant='outline'
      borderRadius='sm'
      color='secondaryText'
      borderColor='secondaryText'
      _hover={{ color: 'text', borderColor: 'text' }}
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
      variant='ghost'
      color='secondaryText'
      _hover={{ color: 'text' }}
      {...rest}
    >
      {children}
    </Button>
  );
}

export { Primary, Secondary, Tertiary };
