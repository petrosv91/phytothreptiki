import React from 'react';

import { Box, Flex, useDisclosure } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

import { Buttons, FormIconInput, FormInput, Modal } from '../../lib/ui';
import FormTagBox from '../../lib/ui/inputs/formTagBox';

export default function ElementForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, errors } = useForm();

  function deleteElement() {}
  function pickingElement() {
    onOpen();
  }
  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Box w='full'>
      <Modal isOpen={isOpen} onClose={onClose} header='Επιλογή Ά Ύλης' darkMode>
        {/* <PickingItem send={send} onClose={onClose} /> */}
      </Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction='column'>
          <FormIconInput
            name='startingMaterial'
            label='Ά Ύλη'
            errors={errors}
            leftIcon='search'
            rightIcon='small-close'
            onClick={pickingElement}
            rightIconClick={deleteElement}
            formRef={register({ required: true })}
          />
          <FormInput
            w='full'
            name='rate'
            label='Συμμετοχή'
            errors={errors}
            formRef={register({ required: true })}
          />
          <FormTagBox name='ingredients' label='Στοιχεία' />
          <Buttons.Primary ml='auto' type='submit'>
            Προσθήκη
          </Buttons.Primary>
        </Flex>
      </form>
    </Box>
  );
}
