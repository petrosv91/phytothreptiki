import React from 'react';

import { Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { getData } from '../../api';
import { RecipeList } from '../../lib/ui';
import ItemList from '../lists/itemList';

function PickingRecipe({ handleItemClick }) {
  const keys = React.useRef(['label']);
  const { data = [], status, error } = useQuery('elements', getData);

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
