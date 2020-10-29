import React from 'react';

import { Text } from '@chakra-ui/core';
import { useQuery } from 'react-query';

import { getData } from '../../api';
import { useFiltersData, usePagination } from '../../hooks';
import RecipeList from './recipeList';

function PickingRecipe({ handleItemClick }) {
  const keys = React.useRef(['label']);
  const [query, setQuery] = React.useState('');
  const { data = [], status, error } = useQuery('elements', getData);
  const filterdData = useFiltersData({ data, query, keys });
  const paginationProps = usePagination(filterdData);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  if (error)
    return (
      <Text color='red.500' fontSize='md' fontWeight='500'>
        {error.message}
      </Text>
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

export default PickingRecipe;
