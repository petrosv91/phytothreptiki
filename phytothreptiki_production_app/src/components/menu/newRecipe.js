import React from 'react';

import { Flex, useDisclosure } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useFormService } from '../../context/formProvider';
import { ConfirmationModal, FormInput } from '../../lib/ui';
import Header from '../../lib/ui/header/header';
import { isFormEmpty } from '../../utils';
import ElementForm from '../element/elementForm';
import ElementStore from '../element/elementStore';

const MESSAGE = 'Προσοχή αν πατήσετε σύνεχεια θα χάσετε ότι έχετε κάνει στην διαδικασία';

export default function Recipe() {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, getValues, errors } = useForm();

  const [state] = useFormService();
  const { elements } = state.context;

  function onSubmit(data) {
    console.log(data);
  }
  function onConfirm() {
    onClose();
    history.push('/');
  }
  function handleback() {
    if (!isFormEmpty(getValues()) || elements.length) {
      onOpen();
      return;
    }
    history.push('/');
  }

  return (
    <Flex as='section' py={6} px={8} direction='column' bg='white' boxShadow='xl'>
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
      </form>
      <ElementForm mt={4} />
      <ElementStore mt={4} />
    </Flex>
  );
}
