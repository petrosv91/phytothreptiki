import React from 'react';

import { Collapse, Flex, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import useGetProducts from '../../api/queries/useGetProducts';
import { weights } from '../../config';
import { useMainMachine } from '../../context/mainMachineProvider';
import { useReactFormSchema } from '../../hooks';
import {
  Modal,
  Buttons,
  FormInput,
  FormSelect,
  FormSwitch,
  EditIcon,
  CloseIcon,
  ProductList,
} from '../../lib/ui';
import SearchIcon from '../../lib/ui/icons/searchIcon';
import PickingItem from '../lists/pickingItem';

function ProductForm() {
  const [edit, setEdit] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const keys = React.useRef(['label']);
  const getProducts = useGetProducts();

  const { productFormSchema } = useReactFormSchema();
  const { register, handleSubmit, getValues, setValue, clearErrors, reset, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(productFormSchema),
  });

  const [{ context }, send] = useMainMachine();
  const { productSwitch = false } = context.switches;

  function onSubmit(formData) {
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
    clearErrors('label');
    setValue('label', product.label);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal isOpen={isOpen} onClose={onClose} header='Επιλογή Προϊόντος'>
        <PickingItem
          keys={keys}
          List={ProductList}
          promiseData={getProducts}
          handleClick={handleProductClick}
        />
      </Modal>
      <Flex direction='column'>
        <FormSwitch
          size='lg'
          name='elementSwitch'
          label={`${productSwitch ? 'Απενεργοποίηση' : 'Ενεργοποίηση'} πεδίων για Έτοιμο Προϊον`}
          isChecked={productSwitch}
          onChange={() => send({ type: 'TOGGLE', key: 'productSwitch' })}
        />
        <Collapse in={productSwitch} animateOpacity>
          <FormInput
            name='label'
            label='Επωνυμία Προιόντος'
            onClick={onOpen}
            leftIcon={SearchIcon}
            rightIcon={getValues('label') && CloseIcon}
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
              <EditIcon mb={2} mr={2} edit={edit} onClick={handleIEditClick} />
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
                  formRef={register({
                    setValueAs: (weightValue) => {
                      const foundWeight = weights.find((w) => {
                        return w.value === Number(weightValue);
                      });
                      return foundWeight?.label || 0;
                    },
                  })}
                />
              )}
            </Flex>
          </Flex>
          <Flex justify='flex-end'>
            <Buttons.Primary mt={4} type='submit'>
              Προσθήκη
            </Buttons.Primary>
          </Flex>
        </Collapse>
      </Flex>
    </form>
  );
}

export default React.memo(ProductForm);
