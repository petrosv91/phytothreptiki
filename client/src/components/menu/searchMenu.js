import React from 'react';

import { Box, useDisclosure } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Menu, Modal } from '../../lib/ui';
import PickingRecipe from '../recipe/pickingRecipe';

function SearchMenu({ drawerClose = () => {} }) {
  const [, send] = useMainMachine();
  const { setValue, clearErrors } = useFormContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ comp, label }, setComponent] = React.useState({});

  function handleRecipeClick({ _id, code, elements, products, ...recipe }) {
    send({ type: 'ADD_RECIPE', id: _id, code, elements, products });
    Object.entries(recipe).forEach(([key, value]) => {
      setValue(key, value);
    });
    clearErrors();
    onClose();
    drawerClose();
  }
  function handleClick(opt) {
    setComponent(opt);
    onOpen();
  }

  const options = [
    { label: 'Συνταγής', comp: <PickingRecipe handleRecipeClick={handleRecipeClick} /> },
  ];
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} header={`Αναζήτηση ${label}`}>
        {comp}
      </Modal>
      <Menu options={options} title='Αναζήτηση' handleClick={handleClick} />
    </Box>
  );
}

export default SearchMenu;
