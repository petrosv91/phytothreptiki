import React from 'react';

import { FormControl, InputGroup, Box } from '@chakra-ui/core';

import { Pagination } from '../../layouts';
import { ElementList as List, Input } from '../../lib/ui';

function ElementList({ query, isLoading, handleClick, handleChange, paginationProps }) {
  return (
    <Box w={300}>
      <FormControl mt={3}>
        <InputGroup>
          <Input
            value={query}
            onChange={handleChange}
            placeholder='Αναζήτηση...'
            color='gray.600'
            bg='gray.100'
            boxShadow='md'
            fontSize=''
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
    </Box>
  );
}

export default ElementList;
