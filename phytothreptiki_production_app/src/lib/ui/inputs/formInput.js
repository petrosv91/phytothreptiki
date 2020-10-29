import React from 'react';

import { FormControl, FormLabel } from '@chakra-ui/core';

import Input from './input';

function FormInput({ errors = {}, onChange, formRef, label, placeholder, name, ...rest }) {
  return (
    <FormControl mt={2} w={130} isInvalid={errors[name]} {...rest}>
      {label && (
        <FormLabel mb={1} htmlFor={name} color='text'>
          {label}
        </FormLabel>
      )}
      <Input
        id={name}
        name={name}
        formRef={formRef}
        onChange={onChange}
        placeholder={placeholder}
      />
    </FormControl>
  );
}

export default React.memo(FormInput);
