import React from 'react';

import { FormControl, FormLabel, InputGroup, InputRightElement, Tag } from '@chakra-ui/core';

import Input from './input';

function FormTagInput({ label, errors = {}, tagLabel, name, tagRest, formRef, ...rest }) {
  return (
    <FormControl mt='2'>
      <FormLabel color='white' htmlFor={name}>
        {label}
      </FormLabel>
      <InputGroup>
        <Input
          bg='white'
          name={name}
          color='gray.900'
          formRef={formRef}
          errorBorderColor='red.500'
          isInvalid={errors[name] ? true : false}
          {...rest}
        />
        <InputRightElement mr='2'>
          <Tag size='md' w={70} justifyContent='center' {...tagRest}>
            {tagLabel}
          </Tag>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}

export default FormTagInput;
