import { Button } from '@chakra-ui/react';

function Primary({ children, ...rest }) {
  return (
    <Button
      variant='solid'
      cursor='pointer'
      borderRadius='sm'
      color='colorText'
      bg='special.500'
      _hover={{ bg: 'special.600' }}
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
