import React from 'react';

import { Flex, useDisclosure, useToast } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

import { useFormService } from '../../context/formProvider';
import { Modal, Buttons, FormIconInput, FormInput } from '../../lib/ui';
import { ValidateTable } from '../../utils';
import PickingElement from './pickingElement';

export default function ElementForm() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset, setValue, errors } = useForm();

  const [state, send] = useFormService();
  const { elements } = state.context;

  function onSubmit(formData) {
    const { element, rate, ingredients } = formData;
    if (!ValidateTable({ formData, elements, toast })) return;
    send({
      type: 'UPDATE_TABLE',
      label: element,
      rate,
      formula: ingredients.split('-'),
      callback: reset,
    });
  }
  function handleItemClick(item) {
    onClose();
    setValue('element', item.label);
    setValue('ingredients', item.formula.join('-'));
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal isOpen={isOpen} onClose={onClose} header='Επιλογή Ά Ύλης' darkMode>
          <PickingElement handleItemClick={handleItemClick} />
        </Modal>
        <Flex direction='column'>
          <FormIconInput
            name='element'
            label='Ά Ύλη'
            errors={errors}
            onClick={onOpen}
            leftIcon='search'
            rightIconClick={reset}
            rightIcon='small-close'
            formRef={register({ required: true })}
          />
          <FormInput
            w='full'
            name='rate'
            label='Συμμετοχή'
            errors={errors}
            formRef={register({ required: true })}
          />
          <FormInput
            w='full'
            name='ingredients'
            label='Στοιχεία'
            cursor='default'
            pointerEvents='none'
            formRef={register}
          />
          <Buttons.Primary mt={4} ml='auto' type='submit'>
            Προσθήκη
          </Buttons.Primary>
        </Flex>
      </form>
    </>
  );
}
