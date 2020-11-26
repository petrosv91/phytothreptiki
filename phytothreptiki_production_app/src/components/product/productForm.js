import React from 'react';

import { Flex, useDisclosure, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MdClose, MdSearch } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

import { subFormSchema } from '../../config/';
import { useFormService } from '../../context/formProvider';
import { Modal, Buttons, FormInput } from '../../lib/ui';
import { validateTable } from '../../utils';

function ProductForm() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(subFormSchema),
  });

  const [state, send] = useFormService();
  const { productStore, product } = state.context;

  function resetForm() {
    send({ type: 'DELETE_ITEM', item: 'product', callback: reset });
  }
  function onSubmit(formData) {
    if (!validateTable({ formData, productStore, toast })) return;
    send({
      type: 'ADD_ROW',
      store: 'productStore',
      data: {
        id: uuidv4(),
        ...formData,
        label: product.label,
      },
      callback: resetForm,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Modal isOpen={isOpen} onClose={onClose} header='Επιλογή Ά Ύλης'>
        <PickingElement send={send} onClose={onClose} />
      </Modal> */}
      <Flex direction='column'>
        <FormInput
          label='Επωνυμία Προιόντος'
          onClick={onOpen}
          leftIcon={MdSearch}
          rightIcon={MdClose}
          rightIconClick={resetForm}
          defaultValue={product.label}
        />
        <Flex align='center' justify='space-between'>
          <FormInput
            w='40%'
            name='weights'
            label='Κιλά'
            tag='kg'
            type='number'
            errors={errors}
            formRef={register}
          />
          <FormInput
            w='40%'
            name='units'
            label='Τεμάχια'
            type='number'
            errors={errors}
            formRef={register}
          />
        </Flex>
        <Buttons.Primary mt={4} ml='auto' type='submit'>
          Προσθήκη
        </Buttons.Primary>
      </Flex>
    </form>
  );
}

export default ProductForm;
