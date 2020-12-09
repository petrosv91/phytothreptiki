import React from 'react';

import { Button, useDisclosure } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Modal } from '../../lib/ui';
import PickingRecipe from '../recipe/pickingRecipe';

function RecipeSearch() {
  const { setValue } = useFormContext();
  const [, send] = useMainMachine();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function editItem({ elements, products, ...recipe }) {
    send({ type: 'ADD_RECIPE', elements, products });
    Object.entries(recipe).forEach(([key, value]) => {
      setValue(key, value);
    });
    onClose();
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} header='Αναζήτηση Συνταγής'>
        <PickingRecipe handleItemClick={editItem} />
      </Modal>
      <Button
        w={150}
        fontSize='md'
        cursor='pointer'
        variant='ghost'
        color='secondaryText'
        borderRadius={0}
        borderBottomWidth={1}
        borderBottomColor='text'
        _hover={{ color: 'text' }}
        onClick={onOpen}
      >
        Αναζήτηση
      </Button>
    </>
  );
}

export default RecipeSearch;
