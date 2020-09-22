import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { elements } from '../../config';
import { useNavbarTitle } from '../../hooks';
import { FormInput, Buttons, FormIconInput } from '../../lib/ui/';
import Header from '../../lib/ui/header/header';
import ElementForm from '../element/elementForm';
import ElementTable from '../element/elementTable';

export default function Recipe() {
  const history = useHistory();
  const { title } = useNavbarTitle();
  const { register, handleSubmit, errors } = useForm();

  function onSubmit(data) {
    console.log(data);
  }
  function handleback() {
    history.push('/');
  }

  return (
    <Flex as='section' py={4} maxW={500} direction='column'>
      <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
        <Header title={title} handleback={handleback} />
        <Flex mt={2} w='full' align='center' justify='space-between'>
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
        <ElementForm mt={4} />
        <ElementTable mt={4} elements={elements} />
      </form>
    </Flex>
  );
}
