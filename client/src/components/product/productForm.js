import React from 'react';

import { Flex, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MdClose, MdSearch } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

import { useReactFormSchema } from '../../config';
import { useMainMachine } from '../../context/mainMachineProvider';
import useStoreValidation from '../../hooks/useStoreValidation';
import { Modal, Buttons, FormInput } from '../../lib/ui';
import PickingProduct from './pickingProduct';

function ProductForm() {
  const { validate } = useStoreValidation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { productFormSchema } = useReactFormSchema();
  const { register, handleSubmit, reset, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(productFormSchema),
  });

  const [state, send] = useMainMachine();
  const { product } = state.context;

  function resetForm() {
    send({ type: 'DELETE_ITEM', key: 'product', callback: reset });
  }
  function onSubmit(formData) {
    if (!validate(formData, 'product')) {
      return;
    }
    send({
      type: 'ADD_ROW',
      key: 'productStore',
      data: {
        id: uuidv4(),
        ...formData,
        label: product.label,
      },
      callback: resetForm,
    });
  }
  function handleProductClick(product) {
    onClose();
    send({ type: 'ADD_ITEM', key: 'product', data: product });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal isOpen={isOpen} onClose={onClose} header='Επιλογή Ά Ύλης'>
        <PickingProduct handleProductClick={handleProductClick} />
      </Modal>
      <Flex direction='column'>
        <FormInput
          label='Επωνυμία Προιόντος'
          onClick={onOpen}
          leftIcon={MdSearch}
          rightIcon={MdClose}
          rightIconClick={resetForm}
          defaultValue={product.label}
        />
        <Flex direction={['column', 'row']} align='center' justify='space-between'>
          <FormInput
            w={['full', '45%']}
            name='units'
            label='Τεμάχια'
            type='number'
            errors={errors}
            formRef={register}
          />
          <FormInput
            w={['full', '45%']}
            name='weights'
            label='Κιλά'
            tag='kg'
            type='number'
            step='any'
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
