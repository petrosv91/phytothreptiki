import React from 'react';

import { Flex } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useMainFormService } from '../../context/mainFormProvider';
import PickingRecipe from '../recipe/pickingRecipe';

function RecipeSearch() {
  const { setValue } = useFormContext();
  const [, send] = useMainFormService();

  function editItem({ elements, products, ...recipe }) {
    send({ type: 'ADD_RECIPE', elements, products });
    Object.entries(recipe).forEach(([key, value]) => {
      setValue(key, value);
    });
  }

  return (
    <Flex direction='column'>
      <PickingRecipe handleItemClick={editItem} />
    </Flex>
  );
}

export default RecipeSearch;
