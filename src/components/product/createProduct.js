import React from 'react';

import { useForm } from 'react-hook-form';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Buttons, FormInput } from '../../lib/ui';

function CreateProduct({ resetItem }) {
  const [state, send] = useMainMachine();
  const { updatedItem: product } = state.context;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      label: product.label,
    },
  });
  const isSubmitting = state.matches('productSubmitting');

  function onSubmit(formData) {
    send({
      type: 'PRODUCT_SUBMIT',
      data: { id: product._id, ...formData },
      callback: () => {
        reset();
        if (resetItem) resetItem();
      },
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput w={300} name='label' label='Επωνυμία Προιόντος' formRef={register} />
      <Buttons.Primary mt={4} w='full' type='submit' isLoading={isSubmitting}>
        Προσθήκη
      </Buttons.Primary>
    </form>
  );
}

export default CreateProduct;
