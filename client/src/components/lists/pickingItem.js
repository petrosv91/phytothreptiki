import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { useFiltersData, usePagination } from '../../hooks';
import { Pagination } from '../../layouts';
import { DatePicker, FormInput, Skeleton } from '../../lib/ui';
import { formatDate } from '../../utils';
import ItemList from './itemList';

function PickingItem({ promiseData, keys, List, showDate, handleClick }) {
  const { data = [], error, status, isFetching } = promiseData;

  const [query, setQuery] = React.useState('');
  const filterdData = useFiltersData({ data, query, keys });
  const { currentData, ...paginationProps } = usePagination(filterdData);

  function handleChange(e) {
    setQuery(e.target.value);
  }
  function handleDateChange(date) {
    setQuery(formatDate(date, '/'));
  }

  if (error)
    return (
      <Text color='red.500' fontSize={['sm', 'md']} fontWeight='500'>
        {error.message}
      </Text>
    );
  if (status === 'loading' || isFetching) {
    return <Skeleton />;
  }
  return (
    <Flex direction='column'>
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
      <ItemList data={currentData} Item={List} handleClick={handleClick} />
      <Pagination {...paginationProps} />
    </Flex>
  );
}

export default PickingItem;
