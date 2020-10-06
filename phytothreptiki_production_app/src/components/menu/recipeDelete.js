import React from 'react';

import { Flex } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import { useNavbarTitle } from '../../hooks';
import Header from '../../lib/ui/header/header';
import PickingRecipe from '../recipe/pickingRecipe';

export default function RecipeDelete() {
  const history = useHistory();
  const { title } = useNavbarTitle();

  function handleback() {
    history.push('/');
  }
  function deleteItem(item) {
    console.log(item);
  }

  return (
    <Flex direction='column'>
      <Header my={4} handleback={handleback} title={title} />
      <PickingRecipe handleItemClick={deleteItem} />
    </Flex>
  );
}
