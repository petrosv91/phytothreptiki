import React from 'react';

import { Flex, useDisclosure } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Buttons, ConfirmationModal, FormInput, Loading } from '../../lib/ui';
import { isFormEmpty } from '../../utils';
import ElementForm from '../element/elementForm';
import ElementStore from '../element/elementStore';
import ProductForm from '../product/productForm';
import ProductStore from '../product/productStore';

const MESSAGE = 'Προσοχή αν πατήσετε σύνεχεια θα χάσετε ότι έχετε κάνει στην διαδικασία';

function Recipe() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [state, send] = useMainMachine();
  const { context } = state;
  const isSubmitting = state.matches('recipeSubmitting');

  const { register, handleSubmit, getValues, reset, setValue, errors } = useFormContext();

  function onSubmit(formData) {
    send({
      type: 'RECIPE_SUBMIT',
      data: formData,
      callback: reset,
    });
  }

  function onConfirm() {
    onClose();
    send({ type: 'DELETE_RECIPE', callback: reset });
  }
  function resetForm() {
    const formValues = getValues();
    if (!isFormEmpty(formValues, context)) {
      onOpen();
    }
  }

  function calcTotalWeight() {
    const { loops, weights } = getValues();
    if (!loops || !weights) {
      setValue('totalWeight', '');
      return;
    }
    setValue('totalWeight', loops * weights);
  }

  return (
    <Flex
      as='section'
      direction='column'
      w='full'
      mt={4}
      py={5}
      px={50}
      bg='gray.600'
      position='relative'
      _before={{
        h: '90%',
        content: "''",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRightWidth: 1,
        borderColor: 'white',
        borderRightStyle: 'dashed',
      }}
    >
      <ConfirmationModal
        message={MESSAGE}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
      />
      <Loading isLoading={isSubmitting} />

      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <Flex align='center' justify='space-between'>
          <Flex>
            <Buttons.Secondary w={150} type='submit'>
              Καταχώρηση
            </Buttons.Secondary>
            <Buttons.Tertiary w={150} onClick={resetForm}>
              Επαναφορά
            </Buttons.Tertiary>
          </Flex>
          <FormInput
            w={150}
            tag='No.'
            name='number'
            type='number'
            errors={errors}
            formRef={register}
          />
        </Flex>
        <Flex mt={4} justify='space-between'>
          <Flex mt={2} w='40%' align='center' justify='space-between'>
            <FormInput w='30%' name='date' label='Ημερομηνία' errors={errors} formRef={register} />
            <FormInput w='30%' name='type' label='Τύπος' errors={errors} formRef={register} />
            <FormInput w='30%' name='recipe' label='Συνταγή' errors={errors} formRef={register} />
          </Flex>
          <Flex w='40%' align='center' justify='space-between'>
            <FormInput
              w='30%'
              name='loops'
              label='Χαρμάνια'
              type='number'
              errors={errors}
              formRef={register}
              onBlur={calcTotalWeight}
            />
            <FormInput
              w='30%'
              name='weights'
              label='Κιλά'
              type='number'
              tag='kg'
              errors={errors}
              formRef={register}
              onBlur={calcTotalWeight}
            />
            <FormInput
              w='30%'
              name='totalWeight'
              label='Συνολικά Κιλά'
              type='number'
              tag='kg'
              cursor='default'
              pointerEvents='none'
              errors={errors}
              formRef={register}
            />
          </Flex>
        </Flex>
      </form>

      <Flex direction={['column', 'row']} justify='space-between'>
        <Flex w='40%' direction='column'>
          <ElementForm mt={4} />
          <ElementStore mt={4} />
        </Flex>
        <Flex w='40%' direction='column'>
          <ProductForm mt={4} />
          <ProductStore mt={4} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Recipe;
