import React from 'react';

import { Flex } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import Header from '../../lib/ui/header/header';

export default function ListRecipe() {
  const history = useHistory();

  async function handleback() {
    history.push('/');
  }

  return (
    <Flex direction='column'>
      <Header my={4} handleback={handleback} title='Αναζήτηση Συνταγής' />
    </Flex>
  );
}
