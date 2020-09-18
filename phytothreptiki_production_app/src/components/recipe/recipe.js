import { Flex } from '@chakra-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { elements } from '../../config/elements';
import { FormInput, Buttons, FormTagBox } from '../../lib/ui/';

export default function Recipe() {
  const { register, handleSubmit, erros } = useForm();

  function onSubmit() {}

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <Flex w='full' justify='space-evenly' align='center'>
        <FormInput name='date' label='Ημερομηνία' formRef={register} />
        <FormInput name='type' label='Τύπος' formRef={register} />
        <FormInput name='recipe' label='Συνταγή' formRef={register} />
      </Flex>
      {/* {elements.map(el => <Flex>
        <FormTagBox name=''/>
      </Flex>)} */}
      <Flex w='full' justify='flex-end'>
        <Buttons.Primary ml='auto' type='submit'>
          Καταχώρηση
        </Buttons.Primary>
      </Flex>
    </form>
  );
}
