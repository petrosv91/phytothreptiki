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
  defaultValue,
  formRef,
  leftIcon,
  rightIcon,
  errors = {},
  onClick,
  rightIconClick,
  ...rest
}) {
  return (
    <FormControl mt='2' isInvalid={errors[name]}>
      <FormLabel htmlFor={name} color='text'>
        {label}
      </FormLabel>
      <InputGroup>
        <InputLeftElement>
          <Icon as={leftIcon} color='text' />
        </InputLeftElement>
        <Input
          py='2'
          px='10'
          name={name}
          formRef={formRef}
          onClick={onClick}
          defaultValue={defaultValue}
          {...rest}
        />
        <InputRightElement cursor='pointer' onClick={rightIconClick}>
          {defaultValue && (
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
