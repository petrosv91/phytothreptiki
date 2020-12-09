import React from 'react';

import { useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { MdClose, MdSearch } from 'react-icons/md';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Buttons, FormInput } from '../../lib/ui';
import { createToast } from '../../utils';

function CreateProduct({ onClose }) {
  const toast = useToast();
  const [, send] = useMainMachine();
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    send({
      type: 'PRODUCT_SUBMIT',
      data,
      toast: (props) => createToast(toast, props),
      callback: onClose,
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name='label'
        label='Επωνυμία Προιόντος'
        leftIcon={MdSearch}
        rightIcon={MdClose}
        rightIconClick={reset}
        formRef={register}
      />
      <Buttons.Primary mt={4} w='full' type='submit'>
        Προσθήκη
      </Buttons.Primary>
    </form>
  );
}

export default CreateProduct;
