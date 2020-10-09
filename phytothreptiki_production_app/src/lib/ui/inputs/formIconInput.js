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
  onClick,
  rightIconClick,
  ...rest
}) {
  return (
    <FormControl mt='2' isInvalid={errors[name]} {...rest} >
      <FormLabel htmlFor={name} color='gray.600'>
        {label}
      </FormLabel>
      <InputGroup>
        <InputLeftElement>
          <Icon as={leftIcon} color='gray.600' />
        </InputLeftElement>
        <Input py='2' px='10' id={name} name={name} onClick={onClick} formRef={formRef} />
        <InputRightElement cursor='pointer' pointerEvents='auto' onClick={rightIconClick}>
          {value && <Icon as={rightIcon} color='red.500' onClick={rightIconClick} />}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default React.memo(FormIconInput);
