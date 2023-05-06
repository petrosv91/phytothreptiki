import { FormControl, FormLabel } from '@chakra-ui/react';

import Switch from './switch';

function FormSwitch({ w, label, name, formRef, ...rest }) {
  return (
    <FormControl w={w} mt={2}>
      {label && (
        <FormLabel htmlFor={name} fontSize={{ sm: 'sm', md: 'md' }} color='text'>
          {label}
        </FormLabel>
      )}
      <Switch name={name} formRef={formRef} {...rest} />
    </FormControl>
  );
}

export default FormSwitch;
