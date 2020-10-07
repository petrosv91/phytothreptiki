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
  value,
  formRef,
  leftIcon,
  rightIcon,
  errors = {},
  rightIconClick,
  ...rest
}) {
  return (
    <FormControl mt='2' isInvalid={errors[name]} {...rest}>
      <FormLabel htmlFor={name} color='gray.500'>
        {label}
      </FormLabel>
      <InputGroup>
        <InputLeftElement>
          <Icon as={leftIcon} color='gray.500' />
        </InputLeftElement>
        <Input py='2' px='10' id={name} name={name} formRef={formRef} />
        <InputRightElement>
          {value && (
            <Icon as={rightIcon} cursor='pointer' color='red.500' onClick={rightIconClick} />
          )}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default React.memo(FormIconInput);
