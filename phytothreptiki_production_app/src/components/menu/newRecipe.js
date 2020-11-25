import React from 'react';

import { Flex, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { useFormService } from '../../context/formProvider';
import { ConfirmationModal, FormInput } from '../../lib/ui';
import Header from '../../lib/ui/header/header';
import { isFormEmpty } from '../../utils';
import ElementForm from '../element/elementForm';
import ElementStore from '../element/elementStore';

const MESSAGE = 'Προσοχή αν πατήσετε σύνεχεια θα χάσετε ότι έχετε κάνει στην διαδικασία';
const schema = yup.object().shape({
  date: yup.number().required().positive(),
  type: yup.string().required(),
  recipe: yup.number().required().positive(),
  loops: yup.number().required().positive(),
  weight: yup.string().required(),
  totalWeight: yup.number().required().positive(),
});

function Recipe() {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, getValues, setValue, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [state] = useFormService();
  const { store } = state.context;

  function onSubmit(data) {
    console.log(data);
  }
  function onConfirm() {
    onClose();
    history.push('/');
  }
  function handleOnBlur() {
    const { loops, weight } = getValues();
    if (!loops || !weight) {
      setValue('totalWeight', '');
      return;
    }
    setValue('totalWeight', loops * weight);
  }
  function handleback() {
    if (!isFormEmpty(getValues()) || store.length) {
      onOpen();
      return;
    }
    history.push('/');
  }

  return (
    <Flex w={[200, 500]} as='section' direction='column' p={5}>
      <ConfirmationModal
        message={MESSAGE}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
      />
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <Header handleback={handleback} submit={true} />
        <Flex mt={2} align='center' justify='space-between'>
          <FormInput
            w='30%'
            name='date'
            label='Ημερομηνία'
            errors={errors}
            formRef={register({ required: true })}
          />
          <FormInput
            w='30%'
            name='type'
            label='Τύπος'
            errors={errors}
            formRef={register({ required: true })}
          />
          <FormInput
            w='30%'
            name='recipe'
            label='Συνταγή'
            errors={errors}
            formRef={register({ required: true })}
          />
        </Flex>
        <Flex align='center' justify='space-between'>
          <FormInput
            w='30%'
            name='loops'
            label='Χαρμάνια'
            type='number'
            errors={errors}
            formRef={register}
            onBlur={handleOnBlur}
          />
          <FormInput
            w='30%'
            name='weight'
            label='Κιλά'
            type='number'
            tag='kg'
            errors={errors}
            formRef={register}
            onBlur={handleOnBlur}
          />
          <FormInput
            w='30%'
            name='totalWeight'
            label='Συνολικά Κιλά'
            type='number'
            tag='kg'
            cursor='default'
            pointerEvents='none'
            errors={errors}
            formRef={register}
          />
        </Flex>
      </form>
      <ElementForm mt={4} />
      <ElementStore mt={4} />
    </Flex>
  );
}

export default Recipe;
