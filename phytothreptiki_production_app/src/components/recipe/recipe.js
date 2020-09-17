import { Flex } from '@chakra-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInput, Buttons } from '../../lib/ui/';

export default function Recipe() {
  const { register, handleSubmit, erros } = useForm();

  function onSubmit() {}

  return (
    <Flex w='full'>
      <form w='full' onSubmit={handleSubmit(onSubmit)}>
        <Flex justify='space-between'>
          <FormInput name='date' label='Ημερομηνία' formRef={register} />
          <FormInput name='type' label='Τύπος' formRef={register} />
          <FormInput name='recipe' label='Συνταγή' formRef={register} />
        </Flex>
        <Flex w='full' justify='flex-end'>
          <Buttons.Primary ml='auto' type='submit'>
            Καταχώρηση
          </Buttons.Primary>
        </Flex>
      </form>
    </Flex>
  );
}
