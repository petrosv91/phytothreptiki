import React from 'react';

import { Box, FormControl, InputGroup } from '@chakra-ui/react';

import { useFiltersData, usePagination } from '../../hooks';
import { Pagination } from '../../layouts';
import { Input } from '../../lib/ui';

function ItemList({ isLoading, handleClick, data, keys, List }) {
  const [query, setQuery] = React.useState('');

  const filterdData = useFiltersData({ data, query, keys });
  const paginationProps = usePagination(filterdData);

  function handleChange(e) {
    setQuery(e.target.value);
  }
  return (
    <Box>
      <FormControl mt={3}>
        <InputGroup>
          <Input
            w={[250, 300]}
            value={query}
            onChange={handleChange}
            placeholder='Αναζήτηση...'
            _placeholder={{ color: 'secondaryText' }}
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

export default ItemList;
