import { Box, Flex, Icon } from '@chakra-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { elements } from '../../config';
import {
  FormInput,
  Buttons,
  FormIconInput,
  CreateNewEntry
} from '../../lib/ui/';

const MAX_ELEMENTS = 3;

export default function Recipe() {
  const { register, handleSubmit, erros } = useForm();

  function onSubmit() {}

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(onSubmit)}>
      <Flex w='full' align='center' justify='space-between'>
        <FormInput name='date' label='Ημερομηνία' formRef={register} />
        <FormInput name='type' label='Τύπος' formRef={register} />
        <FormInput name='recipe' label='Συνταγή' formRef={register} />
      </Flex>
      {/* {MAX_ELEMENTS.map((el, index) => (
        <FormIconInput w='full' name={`el-${index}`} label={el.name} />
      ))} */}
      <CreateNewEntry label='Προσθήκη νέου στοιχείου' />
      <Flex mt='2' w='full' justify='flex-end'>
        <Buttons.Primary ml='auto' type='submit'>
          Καταχώρηση
        </Buttons.Primary>
      </Flex>
    </form>
  );
}
