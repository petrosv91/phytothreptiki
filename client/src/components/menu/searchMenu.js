import { useState, useRef } from 'react';

import { Box, useDisclosure } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useHistory } from 'react-router';

import useGetRecipes from '../../api/queries/useGetRecipes';
import { useMainMachine } from '../../context/mainMachineProvider';
import {
  Modal,
  Loading,
  Accordion,
  RecipeList,
  RawMaterialList,
  ProductionFileList,
} from '../../lib/ui';
import { excludeFromObj } from '../../utils';
import PickingItem from '../lists/pickingItem';

function SearchMenu({ drawerClose = () => {} }) {
  const history = useHistory();
  const [, send] = useMainMachine();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { reset, setValue, clearErrors } = useFormContext();

  const getRecipes = useGetRecipes();
  const [loading, setLoading] = useState(false);
  const [{ comp, label }, setComponent] = useState({});

  const recipeKeys = useRef(['recipe', 'date']);
  const rawMaterialKeys = useRef(['date', 'type']);
  const productionKeys = useRef(['date', 'products']);

  async function handleItemClick(props, path) {
    const { _id, code, elements, file, products, ...rest } = props;
    try {
      onClose();
      setLoading(true);
      const resetRecipe = () => send({ type: 'RESET', callback: reset });
      await new Promise((resolve) => resolve(resetRecipe));
      setTimeout(() => {
        send({ type: 'ADD_RECIPE', id: _id, file, code, elements, products });
        const recipeValues = Object.entries(rest);
        recipeValues.forEach(([key, value]) => setValue(key, value));
        clearErrors();
        setLoading(false);
        drawerClose();
        history.push(path);
      }, [100]);
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
            handleItemClick(recipe, '/');
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
          handleClick={(recipe) => {
            const rest = excludeFromObj(recipe, ['products']);
            handleItemClick(rest, '/rawMaterials');
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
          handleClick={(recipe) => {
            const rest = excludeFromObj(recipe, ['elements']);
            handleItemClick(rest, '/productionFile');
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Loading isLoading={loading} />
      <Modal isOpen={isOpen} onClose={onClose} header={`Αναζήτηση ${label}`}>
        {comp}
      </Modal>
      <Accordion options={options} title='Αναζήτηση' handleClick={handleClick} />
    </>
  );
}

export default SearchMenu;
