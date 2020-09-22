import React from 'react';

import { FormControl, InputGroup, Box } from '@chakra-ui/core';

// import Barcode from '../../assets/barcode.png';
import { Pagination } from '../../layouts';
import { ElementList as List, Input } from '../../lib/ui';

function ElementList({ query, paginationProps, isLoading, handleChange, handleClick }) {
  return (
    <Box w={300}>
      <FormControl mt={3}>
        <InputGroup>
          <Input
            w={300}
            onChange={handleChange}
            placeholder='Αναζήτηση...'
            bg='gray.700'
            color='white'
            value={query}
            borderColor='gray.200'
          />
        </InputGroup>
      </FormControl>
      <List
        pt={5}
        handleClick={handleClick}
        isLoading={isLoading}
        data={paginationProps.currentData}
      />
      {!isLoading && <Pagination {...paginationProps} />}
    </Box>
  );
}

export default ElementList;
