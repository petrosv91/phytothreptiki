import React from 'react';

import { Flex } from '@chakra-ui/core';

import { elements } from '../../config';
import { useFiltersData, usePagination } from '../../hooks';
import ElementList from './elementList';

export default function PickingElement({ handleItemClick }) {
  const keys = React.useRef(['label']);
  const [query, setQuery] = React.useState('');
  const filterdData = useFiltersData({ data: elements, query, keys });
  const paginationProps = usePagination(filterdData);

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <Flex justify='center' align='center' direction='column'>
      <ElementList
        query={query}
        handleChange={handleChange}
        handleClick={handleItemClick}
        paginationProps={paginationProps}
        isLoading={false}
      />
    </Flex>
  );
}
