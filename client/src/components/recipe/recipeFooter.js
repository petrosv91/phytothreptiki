import React from 'react';

import { Flex } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { FormInput } from '../../lib/ui';

function RecipeFooter() {
  const { getValues, setValue, errors, register } = useFormContext();

  function calctotalWeights() {
    const { loops, weights } = getValues();
    if (!loops || !weights) {
      return setValue('totalWeights', '');
    }
    setValue('totalWeights', loops * weights);
  }

  return (
    <Flex direction={['column', 'row']} align='center' justify='space-between'>
      <FormInput
        w={['full', '45%']}
        name='loops'
        label='Χαρμάνια'
        type='number'
        errors={errors}
        formRef={register}
        onBlur={calctotalWeights}
      />
      <FormInput
        w={['full', '45%']}
        name='weights'
        label='Κιλά'
        type='number'
        step='any'
        tag='kg'
        errors={errors}
        formRef={register}
        onBlur={calctotalWeights}
      />
    </Flex>
  );
}

export default React.memo(RecipeFooter);
