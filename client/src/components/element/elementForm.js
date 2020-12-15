import React from 'react';

import { Flex, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MdClose, MdSearch } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

import { useReactFormSchema } from '../../config/';
import { useMainMachine } from '../../context/mainMachineProvider';
import useStoreValidation from '../../hooks/useStoreValidation';
import { Modal, Buttons, FormInput } from '../../lib/ui';
import PickingElement from './pickingElement';

function ElementForm() {
  const { validate } = useStoreValidation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { elementFormSchema } = useReactFormSchema();
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(elementFormSchema),
  });

  const [state, send] = useMainMachine();
  const { element } = state.context;

  function resetForm() {
    send({ type: 'DELETE_ITEM', key: 'element', callback: reset });
  }
  function onSubmit(formData) {
    if (!validate(formData, 'element')) {
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
  function handleElementClick(el) {
    onClose();
    send({ type: 'ADD_ITEM', key: 'element', data: el });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal isOpen={isOpen} onClose={onClose} header='Επιλογή Ά Ύλης'>
        <PickingElement handleElementClick={handleElementClick} />
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
        <Flex direction={['column', 'row']} align='center' justify='space-between'>
          <FormInput
            w={['full', '30%']}
            name='rate'
            label='Συμμετοχή'
            tag='%'
            type='number'
            errors={errors}
            formRef={register}
          />
          <FormInput
            w={['full', '30%']}
            name='price'
            label='Τιμή'
            tag='€'
            type='number'
            step='any'
            errors={errors}
            formRef={register}
          />
          <FormInput
            w={['full', '30%']}
            name='restPrice'
            label='Διάφορα'
            tag='€'
            type='number'
            step='any'
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
