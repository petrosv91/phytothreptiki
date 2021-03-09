import React from 'react';

import { Box, useDisclosure } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import useGetRecipes from '../../api/queries/useGetRecipes';
import { useMainMachine } from '../../context/mainMachineProvider';
import {
  Loading,
  Menu,
  Modal,
  ProductionFileList,
  RawMaterialList,
  RecipeList,
} from '../../lib/ui';
import PickingItem from '../lists/pickingItem';

function SearchMenu({ drawerClose = () => {} }) {
  const [, send] = useMainMachine();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { reset, setValue, clearErrors } = useFormContext();

  const getRecipes = useGetRecipes();
  const [loading, setLoading] = React.useState(false);
  const [{ comp, label }, setComponent] = React.useState({});

  const recipeKeys = React.useRef(['recipe', 'date']);
  const rawMaterialKeys = React.useRef(['date', 'type']);
  const productionKeys = React.useRef(['date', 'products']);

  async function handleItemClick({ _id, code, elements, products, ...rest }) {
    try {
      onClose();
      drawerClose();
      setLoading(true);
      await new Promise((resolve) => {
        return resolve(send({ type: 'DELETE_ITEM', key: 'switches', callback: reset }));
      });
      setTimeout(() => {
        send({ type: 'ADD_RECIPE', id: _id, code, elements, products });
        Object.entries(rest).forEach(([key, value]) => {
          setValue(key, value);
        });
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
    {
      label: 'Συνταγής',
      comp: (
        <PickingItem
          keys={recipeKeys}
          List={RecipeList}
          promiseData={getRecipes}
          handleClick={(recipe) => {
            handleItemClick(recipe);
          }}
        />
      ),
    },
    {
      label: 'Αρχείου Ά Υλών',
      comp: (
        <PickingItem
          showDate={true}
          keys={rawMaterialKeys}
          List={RawMaterialList}
          promiseData={getRecipes}
          handleClick={({ products, ...rest }) => {
            handleItemClick(rest);
          }}
        />
      ),
    },
    {
      label: 'Αρχείου Παραγωγής',
      comp: (
        <PickingItem
          showDate={true}
          keys={productionKeys}
          List={ProductionFileList}
          promiseData={getRecipes}
          handleClick={({ elements, ...rest }) => {
            handleItemClick(rest);
          }}
        />
      ),
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
