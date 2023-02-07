import { useState } from 'react';

import { Flex, Image, Text } from '@chakra-ui/react';

import ItemList from './itemList';
import { ReactComponent as EmptySVG } from '../../assets/no_data.svg';
import { useFiltersData, usePagination } from '../../hooks';
import { Pagination } from '../../lib/layouts';
import { DatePicker, FormInput } from '../../lib/ui';
import { formatDate } from '../../utils';

function PickingItem({ promiseData, keys, List, showDate, handleClick }) {
  const { data = [], error, status, isFetching } = promiseData;
  const isLoading = status === 'loading' || isFetching;

  const [query, setQuery] = useState('');
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
      <Text mt={4} color='red.500' fontWeight='500' fontSize={['sm', 'md']}>
        {error.message}
      </Text>
    );
  if (!isLoading && !data.length) {
    return (
      <Flex direction='column' align='center'>
        <Text mt={4} color='red.500' fontSize={['sm', 'md']} fontWeight='500'>
          Δεν βρέθηκαν δεδομένα
        </Text>
        <Image as={EmptySVG} h='50%' w='50%' mt={10} />
      </Flex>
    );
  }
  return (
    <Flex direction='column'>
      {showDate ? (
        <DatePicker
          w={[250, 300, 350]}
          value={query}
          placeholder='Αναζήτηση...'
          handleChange={handleChange}
          handleDateChange={handleDateChange}
        />
      ) : (
        <FormInput
          w={[250, 300, 350]}
          value={query}
          autoFocus={true}
          onChange={handleChange}
          placeholder='Αναζήτηση...'
        />
      )}
      <ItemList
        Item={List}
        data={currentData}
        loading={isLoading}
        handleClick={handleClick}
      />
      <Pagination {...paginationProps} />
    </Flex>
  );
}

export default PickingItem;
