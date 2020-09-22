import React from 'react';

import { Flex, useDisclosure } from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

import { useRecipeService } from '../../context/recipeProvider';
import { Buttons, FormIconInput, FormInput, Modal } from '../../lib/ui';
import FormTagBox from '../../lib/ui/inputs/formTagBox';
import PickingElement from './pickingElement';

export default function ElementForm() {
  const [state, send] = useRecipeService();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit, errors } = useForm();
  const { element } = state.context;
  console.log(element);
  function deleteElement() {}
  function pickingElement() {
    onOpen();
  }
  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Flex direction='column'>
      <Modal isOpen={isOpen} onClose={onClose} header='Επιλογή Ά Ύλης' darkMode>
        <PickingElement send={send} onClose={onClose} />
      </Modal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex direction='column'>
          <FormIconInput
            name='startingMaterial'
            label='Ά Ύλη'
            errors={errors}
            leftIcon='search'
            defaultValue={element.label}
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
    </Flex>
  );
}
