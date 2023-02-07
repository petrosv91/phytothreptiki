import { useEffect, useCallback, memo } from 'react';

import { Flex } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useMainMachine } from '../../context/mainMachineProvider';
import { FormInput } from '../../lib/ui';
import { roundToTwo } from '../../utils';

function RecipeFooter() {
  const [state] = useMainMachine();
  const { productStore } = state.context;

  const { getValues, setValue, errors, register } = useFormContext();

  useEffect(() => {
    if (productStore.length) {
      const { loops, totalWeights } = getValues();
      if (!loops || !totalWeights) return;
      const newWeights = roundToTwo(totalWeights / loops);
      return setValue('weights', newWeights);
    }
  }, [getValues, setValue, productStore.length]);

  const calcTotalWeights = useCallback(() => {
    const { loops, weights, totalWeights } = getValues();
    if (productStore.length) {
      if (!loops || !totalWeights) return;
      const newWeights = roundToTwo(totalWeights / loops);
      return setValue('weights', newWeights);
    }
    if (!loops || !weights) {
      return setValue('totalWeights', '');
    }
    setValue('totalWeights', loops * weights);
  }, [getValues, setValue, productStore.length]);

  return (
    <Flex direction={['column', 'row']} align='start' justify='space-between'>
      <FormInput
        w={['full', '45%']}
        name='loops'
        label='Χαρμάνια'
        type='number'
        errors={errors}
        formRef={register}
        onBlur={calcTotalWeights}
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
        onBlur={calcTotalWeights}
      />
    </Flex>
  );
}

export default memo(RecipeFooter);
