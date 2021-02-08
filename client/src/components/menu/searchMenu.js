import React from 'react';

import { Box, useDisclosure } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Menu, Modal } from '../../lib/ui';
import PickingProductionFile from '../lists/PickingProductionFile';
import PickingRecipe from '../recipe/pickingRecipe';

function SearchMenu({ drawerClose = () => {} }) {
  const [, send] = useMainMachine();
  const { reset, setValue, clearErrors } = useFormContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ comp, label }, setComponent] = React.useState({});

  async function handleRecipeClick({ _id, code, elements, products, ...recipe }) {
    await new Promise((resolve) => {
      return resolve(send({ type: 'DELETE_ITEM', key: 'switches', callback: reset }));
    });
    send({ type: 'ADD_RECIPE', id: _id, code, elements, products });
    Object.entries(recipe).forEach(([key, value]) => {
      setValue(key, value);
    });
    onClose();
    drawerClose();
    clearErrors();
  }
  async function handleProductionClick({ date, productStore }) {
    await new Promise((resolve) => {
      return resolve(send({ type: 'DELETE_ITEM', key: 'switches', callback: reset }));
    });
    setValue('date', date);
    send({ type: 'ADD_RECIPE', products: productStore });
    onClose();
    drawerClose();
    clearErrors();
  }
  function handleClick(opt) {
    setComponent(opt);
    onOpen();
  }

  const options = [
    { label: 'Συνταγής', comp: <PickingRecipe handleRecipeClick={handleRecipeClick} /> },
    {
      label: 'Παραγωγής',
      comp: <PickingProductionFile handleProductionClick={handleProductionClick} />,
    },
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
