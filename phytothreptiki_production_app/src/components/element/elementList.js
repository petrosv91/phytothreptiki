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
            boxShadow='md'
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
    </Box>
  );
}

export default ElementList;
