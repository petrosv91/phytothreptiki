import React from 'react';

import { Box, useDisclosure } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useMainMachine } from '../../context/mainMachineProvider';
import { Loading, Menu, Modal } from '../../lib/ui';
import PickingProductionFile from '../lists/PickingProductionFile';
import PickingRecipe from '../recipe/pickingRecipe';

function SearchMenu({ drawerClose = () => {} }) {
  const [, send] = useMainMachine();
  const { reset, setValue, clearErrors } = useFormContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = React.useState(false);
  const [{ comp, label }, setComponent] = React.useState({});

  async function handleRecipeClick({ _id, code, elements, products, ...recipe }) {
    try {
      onClose();
      drawerClose();
      setLoading(true);
      await new Promise((resolve) => {
        return resolve(send({ type: 'DELETE_ITEM', key: 'switches', callback: reset }));
      });
      setTimeout(() => {
        send({ type: 'ADD_RECIPE', id: _id, code, elements, products });
        Object.entries(recipe).forEach(([key, value]) => {
          setValue(key, value);
        });
        setLoading(false);
      }, [300]);
      clearErrors();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleProductionClick({ date, productStore }) {
    try {
      onClose();
      drawerClose();
      setLoading(true);
      await new Promise((resolve) => {
        return resolve(send({ type: 'DELETE_ITEM', key: 'switches', callback: reset }));
      });
      setTimeout(() => {
        send({ type: 'ADD_RECIPE', products: productStore });
        setValue('date', date);
        setLoading(false);
      }, [300]);
      clearErrors();
    } catch (error) {
      console.log(error);
    }
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
      <Loading isLoading={loading} />
      <Modal isOpen={isOpen} onClose={onClose} header={`Αναζήτηση ${label}`}>
        {comp}
      </Modal>
      <Menu options={options} title='Αναζήτηση' handleClick={handleClick} />
    </Box>
  );
}

export default SearchMenu;
