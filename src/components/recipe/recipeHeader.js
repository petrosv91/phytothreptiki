import React from 'react';

import { Flex } from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Buttons, FormInput } from '../../lib/ui';
import { getCurrentDate, isFormEmpty, isFormFull } from '../../utils';

function RecipeHeader({ onOpen, handlePrint, printLoading }) {
  const [{ context }, send] = useMainMachine();
  const { register, handleSubmit, control, reset, errors } = useFormContext();
  const mainFormValues = useWatch(control);

  function onSubmit(formData) {
    send({
      type: 'RECIPE_SUBMIT',
      data: formData,
      callback: reset,
    });
  }

  const canSubmit = React.useMemo(() => {
    const { restPrice, loops, weights, ...importantData } = mainFormValues;
    return isFormFull(importantData, context);
  }, [context, mainFormValues]);

  const canReset = React.useMemo(() => {
    const currentDate = getCurrentDate();
    const { date, ...importantData } = mainFormValues;
    return !isFormEmpty(importantData, context) || date !== currentDate;
  }, [context, mainFormValues]);

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <Flex wrap='wrap' align='center' justify={['center', 'space-between']}>
        <Buttons.Secondary w={150} type='submit' isDisabled={!canSubmit}>
          Καταχώρηση
        </Buttons.Secondary>
        <Flex>
          <Buttons.Tertiary w={150} onClick={onOpen} isDisabled={!canReset}>
            Επαναφορά
          </Buttons.Tertiary>
          <Buttons.Tertiary w={150} onClick={handlePrint} isLoading={printLoading}>
            Εκτύπωση
          </Buttons.Tertiary>
        </Flex>
      </Flex>
      <Flex mt={4} justify='flex-end'>
        <FormInput
          w={['full', '30%']}
          tag='No.'
          fontSize='lg'
          color='red.500'
          cursor='default'
          pointerEvents='none'
          defaultValue={context.code}
        />
      </Flex>
      <Flex direction={['column', 'row']} mt={4} align='center' justify='space-between'>
        <FormInput
          w={['full', '30%']}
          name='date'
          label='Ημερομηνία'
          errors={errors}
          formRef={register}
        />
        <FormInput
          w={['full', '30%']}
          name='type'
          label='Τύπος'
          errors={errors}
          formRef={register}
        />
        <FormInput
          w={['full', '30%']}
          name='recipe'
          label='Συνταγή'
          errors={errors}
          formRef={register}
        />
      </Flex>
    </form>
  );
}

export default React.memo(RecipeHeader);
