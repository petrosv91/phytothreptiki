import React from 'react';

import { FormControl, FormLabel, useTheme } from '@chakra-ui/react';

import Select from './select';

function FormSelect({ w, options, placeholder, label, name, errors, formRef, ...rest }) {
  const { colors } = useTheme();
  return (
    <FormControl w={w} mt={2} isInvalid={errors[name]}>
      {label && (
        <FormLabel htmlFor={name} fontSize={{ sm: 'sm', md: 'md' }} color='text'>
          {label}
        </FormLabel>
      )}
      <Select name={name} defaultValue={0} formRef={formRef} {...rest}>
        <option value={0} disabled style={{ color: colors.secondaryText }}>
          {placeholder}
        </option>
        {options.map((opt, index) => (
          <option key={index} value={opt} style={{ background: colors.background }}>
            {opt}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

export default FormSelect;
