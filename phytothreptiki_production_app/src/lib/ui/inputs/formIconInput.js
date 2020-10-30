import React from 'react';

import {
  Icon,
  FormLabel,
  FormControl,
  InputGroup,
  InputLeftElement,
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
    <FormControl mt='2' isInvalid={errors[name]} {...rest}>
      <FormLabel htmlFor={name} color='text'>
        {label}
      </FormLabel>
      <InputGroup>
        <InputLeftElement>
          <Icon as={leftIcon} color='text' />
        </InputLeftElement>
        <Input py='2' px='10' id={name} name={name} onClick={onClick} formRef={formRef} />
        <InputRightElement cursor='pointer' onClick={rightIconClick}>
          {value && (
            <Icon
              as={rightIcon}
              boxSize={5}
              color='red.500'
              _hover={{ color: 'red.400' }}
              onClick={rightIconClick}
            />
          )}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default React.memo(FormIconInput);
