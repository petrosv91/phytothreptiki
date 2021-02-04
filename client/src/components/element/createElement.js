import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { baseElements } from '../../config';
import { useMainMachine } from '../../context/mainMachineProvider';
import { useReactFormSchema } from '../../hooks';
import { Buttons, FormInput, FormSelect } from '../../lib/ui';
import SearchIcon from '../../lib/ui/icons/searchIcon';
import { convertStringToArrayOfNumbers } from '../../utils';

function CreateElement({ resetItem }) {
  const [state, send] = useMainMachine();
  const { updatedItem: element } = state.context;

  const { createElementSchema } = useReactFormSchema();
  const { register, handleSubmit, errors, reset } = useForm({
    reValidateMode: 'onSubmit',
    defaultValues: {
      label: element.label,
      price: element.price,
      formula: element.formula?.join('-'),
      baseElement: element.baseElement?.value,
    },
    resolver: yupResolver(createElementSchema),
  });
  const isSubmitting = state.matches('elementSubmitting');

  function onSubmit(formData) {
    send({
      type: 'ELEMENT_SUBMIT',
      data: { id: element._id, ...formData },
      callback: () => {
        reset();
        if (resetItem) resetItem();
      },
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name='label'
        label='Ά Ύλη'
        leftIcon={resetItem && SearchIcon}
        onClick={resetItem && resetItem}
        errors={errors}
        formRef={register}
      />
      <FormInput
        name='price'
        label='Τιμή'
        tag='€'
        type='number'
        step='any'
        errors={errors}
        formRef={register}
      />
      <FormInput
        name='formula'
        label='Στοιχεία'
        errors={errors}
        formRef={register({
          setValueAs: (formula) => {
            return convertStringToArrayOfNumbers(formula, '-');
          },
        })}
      />
      <FormSelect
        name='baseElement'
        label='Βασικό Στοιχείο'
        placeholder='--- Επιλογή Βασικού Στοιχείου ---'
        options={baseElements}
        errors={errors}
        formRef={register({
          setValueAs: (baseElement) => {
            return baseElements.find((el) => el.value === Number(baseElement));
          },
        })}
      />
      <Buttons.Primary mt={4} w='full' type='submit' isLoading={isSubmitting}>
        Προσθήκη
      </Buttons.Primary>
    </form>
  );
}

export default CreateElement;
