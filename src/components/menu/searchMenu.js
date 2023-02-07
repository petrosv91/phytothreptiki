import { useState, useRef } from 'react';

import { useDisclosure } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useHistory } from 'react-router';

import useGetRecipes from '../../api/queries/useGetRecipes';
import { useMainMachine } from '../../context/mainMachineProvider';
import { Menu, Modal, Accordion, RecipeList } from '../../lib/ui';
import PickingItem from '../lists/pickingItem';

function SearchMenu({ type = 'navbar', toggleLoading }) {
  const history = useHistory();
  const [, send] = useMainMachine();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { reset, setValue, clearErrors } = useFormContext();

  const getRecipes = useGetRecipes();
  const [{ comp, label }, setComponent] = useState({});

  const recipeKeys = useRef(['recipe', 'date', 'company']);

  async function handleItemClick(props, path) {
    const { _id, code, elements, file, products, ...rest } = props;
    onClose();
    toggleLoading();
    const resetRecipe = () => send({ type: 'RESET', callback: reset });
    await new Promise((resolve) => resolve(resetRecipe));
    setTimeout(() => {
      send({ type: 'ADD_RECIPE', id: _id, file, code, elements, products });
      const recipeValues = Object.entries(rest);
      recipeValues.forEach(([key, value]) => {
        if (key === 'company') {
          return setValue(key, value.value);
        }
        setValue(key, value);
      });
      clearErrors();
      toggleLoading();
      history.push(path);
    }, [100]);
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
          showDate={true}
          keys={recipeKeys}
          List={RecipeList}
          promiseData={getRecipes}
          handleClick={(recipe) => {
            const rest = { ...recipe, products: [] };
            handleItemClick(rest, '/');
          }}
        />
      ),
    },
    {
      label: 'Ιστορικό Συνταγών',
      comp: (
        <PickingItem
          showDate={true}
          keys={recipeKeys}
          List={RecipeList}
          promiseData={getRecipes}
          handleClick={(recipe) => {
            handleItemClick(recipe, '/');
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} header={`Αναζήτηση ${label}`}>
        {comp}
      </Modal>
      {(() => {
        if (type === 'navbar') {
          return <Menu options={options} title='Αναζήτηση' handleClick={handleClick} />;
        }
        return (
          <Accordion options={options} title='Αναζήτηση' handleClick={handleClick} />
        );
      })()}
    </>
  );
}

export default SearchMenu;
