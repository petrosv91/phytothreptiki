import React from 'react';

import { Flex, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MdClose, MdSearch } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

import { weights } from '../../config';
import { useMainMachine } from '../../context/mainMachineProvider';
import { useReactFormSchema } from '../../hooks';
import useStoreValidation from '../../hooks/useStoreValidation';
import { Modal, Buttons, FormInput, FormSelect, FormSwitch, EditIcon } from '../../lib/ui';
import PickingProduct from './pickingProduct';

function ProductForm() {
  const { validate } = useStoreValidation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [edit, setEdit] = React.useState(false);

  const { productFormSchema } = useReactFormSchema();
  const { register, handleSubmit, setValue, reset, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(productFormSchema),
  });

  const [state, send] = useMainMachine();
  const { productSwitch = false } = state.context.switches;

  function onSubmit(formData) {
    if (!validate(formData, 'product')) {
      return;
    }
    send({
      type: 'ADD_ROW',
      key: 'productStore',
      data: { id: uuidv4(), ...formData },
      callback: reset,
    });
  }
  function handleIEditClick() {
    setEdit((prev) => !prev);
  }
  function handleProductClick(product) {
    onClose();
    Object.entries(product).forEach(([key, value]) => {
      setValue(key, value);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal isOpen={isOpen} onClose={onClose} header='Επιλογή Προϊόντος'>
        <PickingProduct handleProductClick={handleProductClick} />
      </Modal>
      <Flex direction='column'>
        <FormSwitch
          size='lg'
          name='elementSwitch'
          label={`${productSwitch ? 'Απενεργοποίηση' : 'Ενεργοποίηση'} πεδίων για Έτοιμο Προϊον`}
          isChecked={productSwitch}
          onChange={() => send({ type: 'TOGGLE', key: 'productSwitch' })}
        />
        {productSwitch && (
          <>
            <FormInput
              name='label'
              label='Επωνυμία Προιόντος'
              onClick={onOpen}
              leftIcon={MdSearch}
              rightIcon={MdClose}
              rightIconClick={reset}
              errors={errors}
              formRef={register}
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
              <Flex w={['full', '45%']} align='flex-end'>
                <EditIcon mb={2} mr={2} onClick={handleIEditClick} />
                {edit ? (
                  <FormInput
                    name='weights'
                    label='Κιλά'
                    tag='kg'
                    step='any'
                    type='number'
                    errors={errors}
                    formRef={register}
                  />
                ) : (
                  <FormSelect
                    name='weights'
                    label='Κιλά'
                    placeholder='--- Επιλογή Κιλών ---'
                    options={weights}
                    errors={errors}
                    formRef={register}
                  />
                )}
              </Flex>
            </Flex>
            <Buttons.Primary mt={4} ml='auto' type='submit'>
              Προσθήκη
            </Buttons.Primary>
          </>
        )}
      </Flex>
    </form>
  );
}

export default React.memo(ProductForm);
