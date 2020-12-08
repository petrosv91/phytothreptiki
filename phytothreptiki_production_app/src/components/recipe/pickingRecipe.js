import React from 'react';

import { Text } from '@chakra-ui/react';

import useGetRecipes from '../../api/queries/useGetRecipes';
import { RecipeList } from '../../lib/ui';
import ItemList from '../lists/itemList';

function PickingRecipe({ handleItemClick }) {
  const keys = React.useRef(['label']);
  const { data = [], status, error } = useGetRecipes();

  if (error)
    return (
      <Text textAlign='center' color='red.500' fontSize='md' fontWeight='500'>
        {error.message}
      </Text>
    );
  return (
    <ItemList
      keys={keys}
      data={data}
      List={RecipeList}
      handleClick={handleItemClick}
      isLoading={status === 'loading'}
    />
  );
}

export default PickingRecipe;
