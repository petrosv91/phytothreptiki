import React from 'react';

import { useForm } from 'react-hook-form';
import { MdClose, MdSearch } from 'react-icons/md';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Buttons, FormInput } from '../../lib/ui';

function CreateProduct() {
  const [state, send] = useMainMachine();
  const { register, handleSubmit, reset } = useForm();
  const isSubmitting = state.matches('productSubmitting');

  function onSubmit(formData) {
    send({
      type: 'PRODUCT_SUBMIT',
      data: formData,
      callback: reset,
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
      <Buttons.Primary mt={4} w='full' type='submit' isLoading={isSubmitting}>
        Προσθήκη
      </Buttons.Primary>
    </form>
  );
}

export default CreateProduct;
