import React from 'react';

import { FormControl, InputGroup } from '@chakra-ui/core';

import { Pagination } from '../../layouts';
import { RecipeList as List, Input } from '../../lib/ui';

function RecipeList({ query, isLoading, handleClick, handleChange, paginationProps }) {
  return (
    <>
      <FormControl mt={3}>
        <InputGroup>
          <Input
            w={[250, 300]}
            bg='background'
            value={query}
            onChange={handleChange}
            placeholder='Αναζήτηση...'
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
