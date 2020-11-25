import React from 'react';

import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MdClose, MdSearch } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { useFormService } from '../../context/formProvider';
import { Modal, Buttons, FormInput } from '../../lib/ui';
import { validateTable } from '../../utils';
import PickingElement from './pickingElement';

const schema = yup.object().shape({
  rate: yup.number().required().typeError('Υποχρεωτικό Πεδίο').positive('Μόνο θετικοί αριθμοί'),
  price: yup.number().typeError('Υποχρεωτικό Πεδίο').positive('Μόνο θετικοί αριθμοί'),
  restPrice: yup.number().typeError('Υποχρεωτικό Πεδίο').positive('Μόνο θετικοί αριθμοί'),
});

function ElementForm() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const [state, send] = useFormService();
  const { store, element } = state.context;

  function resetForm() {
    send({ type: 'RESET_FORM', callback: reset });
  }
  function onSubmit(formData) {
    if (!validateTable({ formData, store, toast })) return;
    send({
      type: 'ADD',
      id: uuidv4(),
      ...formData,
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
