import React from 'react';

import { Flex, useDisclosure } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useFormService } from '../../context/formProvider';
import { useNavbarTitle } from '../../hooks';
import { ConfirmationModal, FormInput } from '../../lib/ui';
import Header from '../../lib/ui/header/header';
import { isFormEmpty } from '../../utils';
import ElementForm from '../element/elementForm';
import ElementTable from '../element/elementTable';

const MESSAGE = 'Προσοχή αν πατήσετε σύνεχεια θα χάσετε ότι έχετε κάνει στην διαδικασία';

export default function Recipe() {
  const history = useHistory();
  const { title } = useNavbarTitle();
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
    if (!isFormEmpty(getValues()) && !elements.length) {
      onOpen();
      return;
    }
    history.push('/');
  }

  return (
    <Flex as='section' py={4} w={450} direction='column'>
      <ConfirmationModal message={MESSAGE} callback={onConfirm} isOpen={isOpen} onClose={onClose} />
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <Header title={title} handleback={handleback} submit />
        <Flex mt={2} align='center' justify='space-between'>
          <FormInput
            name='date'
            label='Ημερομηνία'
            errors={errors}
            formRef={register({ required: true })}
          />
          <FormInput
            name='type'
            label='Τύπος'
            errors={errors}
            formRef={register({ required: true })}
          />
          <FormInput
            name='recipe'
            label='Συνταγή'
            errors={errors}
            formRef={register({ required: true })}
          />
        </Flex>
      </form>
      <ElementForm mt={4} />
      <ElementTable mt={4} />
    </Flex>
  );
}
