import React, { useCallback, useState } from 'react';

import { Flex, useDisclosure, useToast } from '@chakra-ui/core';
import { SmallCloseIcon, SearchIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { useFormService } from '../../context/formProvider';
import { Modal, Buttons, FormIconInput, FormInput } from '../../lib/ui';
import FormSlider from '../../lib/ui/slider/formSlider';
import { validateTable } from '../../utils';
import PickingElement from './pickingElement';

export default function ElementForm() {
  const toast = useToast();
  const [rate, setRate] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset, setValue, getValues, errors } = useForm();

  const [state, send] = useFormService();
  const { store } = state.context;
  const onSliderChange = useCallback((value) => {
    setRate(value);
  }, []);
  function onSubmit(formData) {
    const { element, ingredients } = formData;
    if (!validateTable({ formData, rate, store, toast })) return;
    send({
      type: 'UPDATE_TABLE',
      id: uuidv4(),
      label: element,
      rate: rate,
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
        <Modal isOpen={isOpen} onClose={onClose} header='Επιλογή Ά Ύλης'>
          <PickingElement handleItemClick={handleItemClick} />
        </Modal>
        <Flex direction='column'>
          <FormIconInput
            label='Ά Ύλη'
            name='element'
            onClick={onOpen}
            leftIcon={SearchIcon}
            rightIcon={SmallCloseIcon}
            rightIconClick={reset}
            errors={errors}
            value={getValues('element')}
            formRef={register({ required: true })}
          />
          <FormSlider label='Συμμετοχή' value={rate} onChange={onSliderChange} />
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
