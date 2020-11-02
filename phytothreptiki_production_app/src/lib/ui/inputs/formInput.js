import React from 'react';

import { FormControl, FormLabel, InputGroup, InputRightElement, Tag } from '@chakra-ui/core';

import { useColorMode } from '../../../context/colorModeProvider';
import Input from './input';

function FormInput({ errors = {}, w, formRef, label, name, tag, ...rest }) {
  const { currentColor } = useColorMode();
  return (
    <FormControl w={w} mt={2} isInvalid={errors[name]}>
      {label && (
        <FormLabel mb={1} htmlFor={name} color='text'>
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <Input pr={tag ? '10' : '4'} name={name} formRef={formRef} {...rest} />
        {tag && (
          <InputRightElement>
            <Tag size='lg' color='colorText' bg={`${currentColor}.400`}>
              {tag}
            </Tag>
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
}

export default React.memo(FormInput);
