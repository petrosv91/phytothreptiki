import React from 'react';

import { FormControl, FormLabel } from '@chakra-ui/core';

import Switch from './switch';

function FormSwitch({ label, formRef, name, ...rest }) {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <FormControl mt={2}>
      {label && (
        <FormLabel ml={1} htmlFor={name} {...rest}>
          {label}
        </FormLabel>
      )}
      <Switch
        formRef={formRef}
        name={name}
        isChecked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
    </FormControl>
  );
}

export default FormSwitch;
