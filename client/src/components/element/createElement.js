import React from 'react';

import { useForm } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';

import { baseElements } from '../../config';
import { useMainMachine } from '../../context/mainMachineProvider';
import { Buttons, FormInput, FormSelect } from '../../lib/ui';

function CreateElement({ resetItem }) {
  const [state, send] = useMainMachine();
  const { updatedItem: element } = state.context;

  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      label: element.label,
      formula: element.formula?.join('-'),
      baseElement: element.baseElement,
    },
  });
  const isSubmitting = state.matches('elementSubmitting');

  function onSubmit(formData) {
    send({
      type: 'ELEMENT_SUBMIT',
      data: { id: element._id, formData },
      callback: () => {
        reset();
        resetItem();
      },
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name='label'
        label='Ά Ύλη'
        leftIcon={resetItem && MdSearch}
        onClick={resetItem && resetItem}
        formRef={register({ required: true })}
      />
      <FormInput name='formula' label='Στοιχεία' errors={errors} formRef={register} />
      <FormSelect
        name='baseElement'
        label='Βασικό Στοιχείο'
        placeholder='--- Επιλογή Βασικού Στοιχείου ---'
        options={baseElements}
        errors={errors}
        formRef={register}
      />
      <Buttons.Primary mt={4} w='full' type='submit' isLoading={isSubmitting}>
        Προσθήκη
      </Buttons.Primary>
    </form>
  );
}

export default CreateElement;
