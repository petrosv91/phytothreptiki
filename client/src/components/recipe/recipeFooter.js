import React from 'react';

import { Flex } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useMainMachine } from '../../context/mainMachineProvider';
import { FormInput } from '../../lib/ui';
import { roundToTwo } from '../../utils';

function RecipeFooter() {
  const [state] = useMainMachine();
  const { productStore } = state.context;
  const { getValues, setValue, errors, register } = useFormContext();

  function calctotalWeights() {
    const { loops, weights, totalWeights } = getValues();
    if (productStore.length) {
      if (!loops && !totalWeights) return;
      const newWeights = roundToTwo(totalWeights / loops);
      return setValue('weights', newWeights);
    }
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
