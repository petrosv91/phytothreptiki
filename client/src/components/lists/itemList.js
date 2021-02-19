import React from 'react';

import { Box } from '@chakra-ui/react';

import { useFiltersData, usePagination } from '../../hooks';
import { Pagination } from '../../layouts';
import { DatePicker, FormInput } from '../../lib/ui';
import { formatDate } from '../../utils';

function ItemList({ isLoading, handleClick, data, keys, List, showDate }) {
  const [query, setQuery] = React.useState('');

  const filterdData = useFiltersData({ data, query, keys });
  const paginationProps = usePagination(filterdData);

  function handleChange(e) {
    setQuery(e.target.value);
  }
  function handleDateChange(date) {
    setQuery(formatDate(date, '/'));
  }

  return (
    <Box>
      {showDate ? (
        <DatePicker
          w={[250, 300]}
          value={query}
          placeholder='Αναζήτηση...'
          handleChange={handleChange}
          handleDateChange={handleDateChange}
        />
      ) : (
        <FormInput
          w={[250, 300]}
          value={query}
          autoFocus={true}
          onChange={handleChange}
          placeholder='Αναζήτηση...'
        />
      )}
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
