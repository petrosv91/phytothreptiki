import React from 'react';

import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MdClose, MdSearch } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

import { useReactFormSchema } from '../../config/';
import { useMainFormService } from '../../context/mainFormProvider';
import { Modal, Buttons, FormInput } from '../../lib/ui';
import { validateElementStore } from '../../utils';
import PickingElement from './pickingElement';

function ElementForm() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { elementFormSchema } = useReactFormSchema();
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(elementFormSchema),
  });

  const [state, send] = useMainFormService();
  const { element, ...context } = state.context;

  function resetForm() {
    send({ type: 'DELETE_ITEM', key: 'element', callback: reset });
  }
  function onSubmit(formData) {
    if (!validateElementStore(formData, context, toast)) {
      return;
    }
    send({
      type: 'ADD_ROW',
      key: 'elementStore',
      data: {
        id: uuidv4(),
        ...formData,
        label: element.label,
        formula: element.formula,
      },
      callback: resetForm,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal isOpen={isOpen} onClose={onClose} header='Επιλογή Ά Ύλης'>
        <PickingElement send={send} onClose={onClose} />
      </Modal>
      <Flex direction='column'>
        <FormInput
          label='Ά Ύλη'
          onClick={onOpen}
          leftIcon={MdSearch}
          rightIcon={MdClose}
          rightIconClick={resetForm}
          defaultValue={element.label}
        />
        <Flex align='center' justify='space-between'>
          <FormInput
            w='30%'
            name='rate'
            label='Συμμετοχή'
            tag='%'
            type='number'
            errors={errors}
            formRef={register}
          />
          <FormInput
            w='30%'
            name='price'
            label='Τιμή'
            tag='€'
            type='number'
            errors={errors}
            formRef={register}
          />
          <FormInput
            w='30%'
            name='restPrice'
            label='Διάφορα'
            tag='€'
            type='number'
            errors={errors}
            formRef={register}
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
