import React from 'react';

import { Flex, Text } from '@chakra-ui/core';
import { useQuery } from 'react-query';

import { getData } from '../../api';
import { useFiltersData, usePagination } from '../../hooks';
import RecipeList from './recipeList';

export default function PickingRecipe({ handleItemClick }) {
  const { data = [], status, error } = useQuery('elements', getData);

  const keys = React.useRef(['label']);
  const [query, setQuery] = React.useState('');
  const filterdData = useFiltersData({ data, query, keys });
  const paginationProps = usePagination(filterdData);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  if (error)
    return (
      <Flex justify='center' align='center'>
        <Text color='white' fontSize='md' fontWeight='500'>
          {error.message}
        </Text>
      </Flex>
    );
  return (
    <RecipeList
      query={query}
      handleChange={handleChange}
      handleClick={handleItemClick}
      paginationProps={paginationProps}
      isLoading={status === 'loading'}
    />
  );
}
