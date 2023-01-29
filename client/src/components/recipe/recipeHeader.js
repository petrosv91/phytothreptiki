import { useMemo, memo } from 'react';

import { Flex } from '@chakra-ui/react';
import { useFormContext, useWatch } from 'react-hook-form';
import { queryCache } from 'react-query';

import { companies } from '../../config/options';
import { useMainMachine } from '../../context/mainMachineProvider';
import { Buttons, FormInput, FormSelect } from '../../lib/ui';
import { excludeFromObj, getCurrentDate, isFormEmpty, isFormFull } from '../../utils';
import { UploadFile } from '../files/upload';

function RecipeHeader({ onOpen, handlePrint, printLoading }) {
  const [{ context }, send] = useMainMachine();
  const { register, handleSubmit, control, reset, errors } = useFormContext();
  const mainFormValues = useWatch(control);

  function onSubmit(formData) {
    send({
      type: 'RECIPE_SUBMIT',
      formData,
      callback: () => {
        reset();
        queryCache.refetchQueries(['recipes']);
      },
    });
  }

  const canSubmit = useMemo(() => {
    const importantData = excludeFromObj(mainFormValues, [
      'loops',
      'weights',
      'restPrice',
    ]);
    return isFormFull(importantData, context);
  }, [context, mainFormValues]);

  const canReset = useMemo(() => {
    const currentDate = getCurrentDate();
    const { date, ...importantData } = mainFormValues;
    return !isFormEmpty(importantData, context) || date !== currentDate;
  }, [context, mainFormValues]);

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <Flex direction='column' gridGap={2}>
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
        <UploadFile
          file={context.file}
          saveFile={(file) => send({ type: 'SAVE_FILE', file })}
          deleteFile={() => send({ type: 'DELETE_FILE' })}
        />
      </Flex>
      <Flex justify='flex-end'>
        <FormSelect
          w={['full', '30%']}
          label='Εταιρεία'
          name='company'
          placeholder='--- Επιλογή Εταιρείας---'
          options={companies}
          errors={errors}
          formRef={register}
        />
      </Flex>
      <Flex mt={4} direction={['column', 'row']} align='start' justify='space-between'>
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

export default memo(RecipeHeader);
