import React from 'react';

import { useDisclosure } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Menu, Modal } from '../../lib/ui';
import PickingRecipe from '../recipe/pickingRecipe';

function SearchMenu() {
  const [, send] = useMainMachine();
  const { setValue } = useFormContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ comp, label }, setComponent] = React.useState({});

  function handleRecipeClick({ elements, products, ...recipe }) {
    send({ type: 'ADD_RECIPE', elements, products });
    Object.entries(recipe).forEach(([key, value]) => {
      setValue(key, value);
    });
    onClose();
  }
  function handleClick(opt) {
    onOpen();
    setComponent(opt);
  }

  const options = [
    { label: 'Συνταγής', comp: <PickingRecipe handleRecipeClick={handleRecipeClick} /> },
  ];
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} header={`Αναζήτηση ${label}`}>
        {comp}
      </Modal>
      <Menu options={options} title='Αναζήτηση' handleClick={handleClick} />
    </div>
  );
}

export default SearchMenu;
