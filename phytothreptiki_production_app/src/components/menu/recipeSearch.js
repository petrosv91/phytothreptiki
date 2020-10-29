import React from 'react';

import { Flex } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import Header from '../../lib/ui/header/header';
import PickingRecipe from '../recipe/pickingRecipe';

function RecipeSearch() {
  const history = useHistory();

  function handleback() {
    history.push('/');
  }
  function editItem(item) {
    console.log(item);
  }

  return (
    <Flex direction='column'>
      <Header my={4} handleback={handleback} />
      <PickingRecipe handleItemClick={editItem} />
    </Flex>
  );
}

export default RecipeSearch;
