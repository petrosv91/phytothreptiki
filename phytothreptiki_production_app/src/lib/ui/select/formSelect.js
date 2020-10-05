import React from 'react';

import { FormLabel, FormControl } from '@chakra-ui/core';

import Select from './select';

function FormSelect({
  name,
  label,
  formRef,
  onChange,
  options,
  optionId,
  optionName,
  defaultValue,
  ...rest
}) {
  return (
    <FormControl mt={2} {...rest}>
      {label && (
        <FormLabel mb={1} color='white' htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <Select formRef={formRef} name={name} defaultValue={defaultValue} onChange={onChange}>
        {options.map((option, index) => (
          <option key={index} value={option[optionId]}>
            {option[optionName]}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

export default FormSelect;
