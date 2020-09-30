import React from 'react';

import { FormControl, FormLabel } from '@chakra-ui/core';

import Input from './input';

function FormInput({ errors = {}, onChange, formRef, label, placeholder, name, ...rest }) {
  return (
    <FormControl mt={2} isInvalid={errors[name] ? true : false}>
      {label && (
        <FormLabel mb={1} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <Input
        w={130}
        name={name}
        color='gray.900'
        formRef={formRef}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
    </FormControl>
  );
}

export default React.memo(FormInput);
