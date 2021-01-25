import React from 'react';

import { Flex } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { FormInput } from '../../lib/ui';

function RecipeMiddle() {
  const { register, errors } = useFormContext();

  return (
    <Flex direction={['column', 'row']} mt={4} align='center' justify='space-between'>
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

export default React.memo(RecipeMiddle);
