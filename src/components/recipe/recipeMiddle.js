import { useEffect, memo } from 'react';

import { Flex } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useMainMachine } from '../../context/mainMachineProvider';
import { FormInput } from '../../lib/ui';
import { roundToTwo } from '../../utils';

function RecipeMiddle() {
  const [state] = useMainMachine();
  const { productStore } = state.context;

  const { register, setValue, getValues, errors } = useFormContext();

  useEffect(() => {
    if (!productStore.length) {
      const { loops, weights } = getValues();
      if (loops && weights) {
        return setValue('totalWeights', loops * weights);
      }
      return setValue('totalWeights', '');
    }
    const totalWeights = roundToTwo(
      productStore.reduce((prev, curr) => {
        return prev + curr.weights * curr.units;
      }, 0),
    );
    setValue('totalWeights', totalWeights);
  }, [productStore, setValue, getValues]);

  return (
    <Flex mt={4} direction={['column', 'row']} align='start' justify='space-between'>
      <FormInput
        w={['full', '45%']}
        name='restPrice'
        label='Διάφορα'
        tag='€'
        type='number'
        step='any'
        errors={errors}
        formRef={register}
      />
      <FormInput
        w={['full', '45%']}
        tag='kg'
        name='totalWeights'
        label='Συνολικά Κιλά'
        cursor='default'
        tabIndex='-1'
        pointerEvents='none'
        errors={errors}
        formRef={register}
      />
    </Flex>
  );
}

export default memo(RecipeMiddle);
