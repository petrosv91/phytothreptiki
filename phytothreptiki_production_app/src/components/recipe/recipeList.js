import React from 'react';

import { FormControl, InputGroup } from '@chakra-ui/core';

import { Pagination } from '../../layouts';
import { RecipeList as List, Input } from '../../lib/ui';

function RecipeList({
  query,
  paginationProps,
  isLoading,
  handleChange,
  handleClick
}) {
  return (
    <>
      <FormControl mt={3}>
        <InputGroup>
          <Input
            value={query}
            onChange={handleChange}
            placeholder='Αναζήτηση...'
            bg='gray.100'
            color='gray.600'
            boxShadow='md'
            borderWidth={1}
            borderColor='gray.400'
            _placeholder={{ color: 'gray.500' }}
            _focus={{ bg: 'white', borderColor: 'teal.200' }}
          />
        </InputGroup>
      </FormControl>
      <List
        pt={5}
        isLoading={isLoading}
        handleClick={handleClick}
        data={paginationProps.currentData}
      />
      {!isLoading && <Pagination {...paginationProps} />}
    </>
  );
}

export default RecipeList;
