import React from 'react';

import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useMainFormService } from '../../context/mainFormProvider';
import { ConfirmationModal, FormInput, Loading } from '../../lib/ui';
import { createToast, isFormEmpty } from '../../utils';
import ElementForm from '../element/elementForm';
import ElementStore from '../element/elementStore';
import ProductForm from '../product/productForm';
import ProductStore from '../product/productStore';

const MESSAGE = 'Προσοχή αν πατήσετε σύνεχεια θα χάσετε ότι έχετε κάνει στην διαδικασία';

function Recipe() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [state, send] = useMainFormService();
  const { context } = state;
  const isSubmitting = state.matches('submitting');

  const { register, handleSubmit, getValues, reset, setValue, errors } = useFormContext();

  function onConfirm() {
    onClose();
  }
  function onSubmit(formData) {
    send({
      type: 'SUBMIT',
      data: formData,
      callback: reset,
      toast: (props) => createToast(toast, props),
    });
  }

  function handleback() {
    const formValues = getValues();
    if (!isFormEmpty(formValues, context)) {
      onOpen();
      return;
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
    <Flex w={[200, 500]} as='section' direction='column' p={5}>
      <ConfirmationModal
        message={MESSAGE}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
      />
      <Loading isLoading={isSubmitting} />
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <Flex mt={2} align='center' justify='space-between'>
          <FormInput w='30%' name='date' label='Ημερομηνία' errors={errors} formRef={register} />
          <FormInput w='30%' name='type' label='Τύπος' errors={errors} formRef={register} />
          <FormInput w='30%' name='recipe' label='Συνταγή' errors={errors} formRef={register} />
        </Flex>
        <Flex align='center' justify='space-between'>
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
      </form>
      <ElementForm mt={4} />
      <ElementStore mt={4} />
      <ProductForm mt={4} />
      <ProductStore mt={4} />
    </Flex>
  );
}

export default Recipe;
