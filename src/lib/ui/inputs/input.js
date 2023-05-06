import { Input as ChakraInput } from '@chakra-ui/react';

function Input({ formRef, name, ...rest }) {
  return (
    <ChakraInput
      name={name}
      ref={formRef}
      color='text'
      fontWeight='500'
      autoComplete='off'
      borderRadius='sm'
      borderColor='secondaryText'
      errorBorderColor='red.500'
      focusBorderColor='special.600'
      _hover={{ borderColor: 'text' }}
      {...rest}
    />
  );
}

export default Input;
