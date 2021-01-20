import React from 'react';

import { FormControl, FormLabel } from '@chakra-ui/react';

import Select from './select';

function FormSelect({ w, options, label, name, errors, formRef, ...rest }) {
  return (
    <FormControl w={w} mt={2} isInvalid={errors[name]}>
      {label && (
        <FormLabel htmlFor={name} fontSize={{ sm: 'sm', md: 'md' }} color='text'>
          {label}
        </FormLabel>
      )}
      <Select placeholder='-- Διάλεξε επιλογή --' name={name} formRef={formRef} {...rest}>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

export default FormSelect;
