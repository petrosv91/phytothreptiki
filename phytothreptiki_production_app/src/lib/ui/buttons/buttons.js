import React from 'react';

import { Button, IconButton } from '@chakra-ui/core';

function Primary({ children, ...rest }) {
  return (
    <Button
      border={0}
      variant='solid'
      bg='teal.400'
      color='white'
      cursor='pointer'
      _hover={{ color: 'white', bg: 'teal.500' }}
      {...rest}
    >
      {children}
    </Button>
  );
}

function Secondary({ children, ...rest }) {
  return (
    <Button
      border={0}
      cursor='pointer'
      fontSize='sm'
      variant='outline'
      boxShadow='none'
      outline='none'
      {...rest}
    >
      {children}
    </Button>
  );
}

function Tertiary({ children, ...rest }) {
  return (
    <Button
      bg='gray.50'
      fontSize='md'
      cursor='pointer'
      color='gray.500'
      variant='outline'
      {...rest}
    >
      {children}
    </Button>
  );
}

function Icon({ icon, ...rest }) {
  return (
    <IconButton
      size='md'
      icon={icon}
      bg='teal.300'
      rounded='full'
      cursor='pointer'
      _hover={{ bg: 'teal.300' }}
      _focus={{ boxShadow: 'none' }}
      {...rest}
    />
  );
}

export { Primary, Secondary, Tertiary, Icon };
