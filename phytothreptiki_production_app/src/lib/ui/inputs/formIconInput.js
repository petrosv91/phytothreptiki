import React from 'react';

import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Icon,
  InputRightElement,
} from '@chakra-ui/core';

import Input from './input';

function FormIconInput({
  name,
  label,
  formRef,
  leftIcon,
  rightIcon,
  errors = {},
  rightIconClick,
  ...rest
}) {
  return (
    <FormControl mt='2' isInvalid={errors[name] ? true : false}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        <InputLeftElement>
          <Icon as={leftIcon} color='gray.500' />
        </InputLeftElement>
        <Input py='2' px='10' bg='white' name={name} color='gray.900' formRef={formRef} {...rest} />
        <InputRightElement>
          <Icon cursor='pointer' as={rightIcon} color='red.500' onClick={rightIconClick} />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default React.memo(FormIconInput);
