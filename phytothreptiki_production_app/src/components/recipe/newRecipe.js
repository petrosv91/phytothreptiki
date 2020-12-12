import React from 'react';

import { Flex, useDisclosure } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useReactToPrint } from 'react-to-print';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Buttons, ConfirmationModal, FormInput, Loading } from '../../lib/ui';
import { isFormEmpty } from '../../utils';
import ElementForm from '../element/elementForm';
import ElementStore from '../element/elementStore';
import ComponentToPrint from '../print/componentToPrint';
import ProductForm from '../product/productForm';
import ProductStore from '../product/productStore';

const MESSAGE = 'Προσοχή αν πατήσετε σύνεχεια θα χάσετε ότι έχετε κάνει στην διαδικασία';

function Recipe() {
  const printRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [state, send] = useMainMachine();
  const { context } = state;
  const isLoading = state.matches('gettingMaxCode');
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
    <Flex minW={600} direction='column' mt={10} p={10} bg='background' boxShadow='lg'>
      <Loading isLoading={isSubmitting || isLoading} />
      <ComponentToPrint printRef={printRef} />
      <ConfirmationModal
        message={MESSAGE}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
      />
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <Flex align='center' justify='space-between'>
          <Buttons.Secondary w={150} type='submit'>
            Καταχώρηση
          </Buttons.Secondary>
          <Flex>
            <Buttons.Tertiary w={150} onClick={resetForm}>
              Επαναφορά
            </Buttons.Tertiary>
            <Buttons.Tertiary w={150} onClick={handlePrint}>
              Εκτύπωση
            </Buttons.Tertiary>
          </Flex>
        </Flex>
        <Flex mt={4} justify='flex-end'>
          <FormInput
            w={150}
            tag='No.'
            cursor='default'
            pointerEvents='none'
            defaultValue={context.code}
          />
        </Flex>
        <Flex mt={4} align='center' justify='space-between'>
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
            tag='kg'
            type='number'
            name='totalWeight'
            label='Συνολικά Κιλά'
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
