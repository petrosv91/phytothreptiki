import React from 'react';

import { FormControl, FormLabel } from '@chakra-ui/core';

import Input from './input';

function FormInput({ errors = {}, onChange, formRef, label, placeholder, name, ...rest }) {
  return (
    <FormControl mt={2} w={130} isInvalid={errors[name]} {...rest}>
      {label && (
        <FormLabel mb={1} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <Input
        id={name}
        name={name}
        color='gray.900'
        formRef={formRef}
        onChange={onChange}
        placeholder={placeholder}
      />
    </FormControl>
  );
}

export default React.memo(FormInput);
