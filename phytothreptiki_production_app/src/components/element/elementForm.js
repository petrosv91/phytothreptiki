import React from 'react';

import { Flex, useDisclosure, useToast } from '@chakra-ui/core';
import { SmallCloseIcon, SearchIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { useFormService } from '../../context/formProvider';
import { Modal, Buttons, FormIconInput, FormInput } from '../../lib/ui';
import { validateTable } from '../../utils';
import PickingElement from './pickingElement';

function ElementForm() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset, errors } = useForm();

  const [state, send] = useFormService();
  const { store, element } = state.context;

  function resetForm() {
    send({ type: 'RESET_FORM', callback: reset });
  }
  function onSubmit(formData) {
    const { rate, price, restPrice } = formData;
    if (!validateTable({ formData, store, toast })) return;
    resetForm();
    send({
      type: 'ADD',
      id: uuidv4(),
      rate,
      price,
      restPrice,
      label: element.label,
      formula: element.formula,
      callback: resetForm,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal isOpen={isOpen} onClose={onClose} header='Επιλογή Ά Ύλης'>
        <PickingElement send={send} onClose={onClose} />
      </Modal>
      <Flex direction='column'>
        <FormIconInput
          label='Ά Ύλη'
          onClick={onOpen}
          leftIcon={SearchIcon}
          rightIcon={SmallCloseIcon}
          rightIconClick={resetForm}
          defaultValue={element.label}
        />
        <Flex align='center' justify='space-between'>
          <FormInput
            w='30%'
            name='rate'
            label='Συμμετοχή'
            type='number'
            tag='%'
            formRef={register({ validate: (value) => Number(value) > 0 })}
          />
          <FormInput
            w='30%'
            name='price'
            label='Τιμή'
            type='number'
            tag='€'
            formRef={register({ validate: (value) => Number(value) > 0 })}
          />
          <FormInput
            w='30%'
            name='restPrice'
            label='Διάφορα'
            type='number'
            tag='€'
            formRef={register({ validate: (value) => Number(value) > 0 })}
          />
        </Flex>
        <FormInput
          label='Στοιχεία'
          cursor='default'
          pointerEvents='none'
          defaultValue={element.formula?.join('-')}
        />
        <Buttons.Primary mt={4} ml='auto' type='submit'>
          Προσθήκη
        </Buttons.Primary>
      </Flex>
    </form>
  );
}

export default ElementForm;
