import React from 'react';

import { FormControl, FormLabel } from '@chakra-ui/core';

import Switch from './switch';

function FormSwitch({ label, formRef, name, ...rest }) {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <FormControl mt={2}>
      <Switch
        formRef={formRef}
        name={name}
        isChecked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        {...rest}
      />
      {label && (
        <FormLabel ml={1} htmlFor={name}>
          {label}
        </FormLabel>
      )}
    </FormControl>
  );
}

export default FormSwitch;
