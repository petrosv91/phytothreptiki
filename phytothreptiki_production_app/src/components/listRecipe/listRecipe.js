import React from 'react';

import { Flex } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import useNavbarTitle from '../../hooks/useNavbarTitle';
import Header from '../../lib/ui/header/header';
import PickingElement from '../element/pickingElement';

export default function ListRecipe() {
  const history = useHistory();
  const { title } = useNavbarTitle();

  function handleItemClick(item) {
    console.log(item);
  }
  function handleback() {
    history.push('/');
  }

  return (
    <Flex direction='column'>
      <Header my={4} handleback={handleback} title={title} />
      <PickingElement handleItemClick={handleItemClick} />
    </Flex>
  );
}
